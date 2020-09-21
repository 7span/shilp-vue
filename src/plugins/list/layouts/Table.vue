<template>
  <div class="sp-table" :class="{ 'sp-table--sticky-header': stickyHeader }">
    <table class="sp-table__table">
      <!-- HEADER -->
      <thead>
        <tr v-for="(row, rowIndex) in headers" :key="`row-${rowIndex}`">
          <template v-for="(col, colIndex) in row">
            <th
              v-if="col.visible"
              :key="`sp-table-header-${col.name}-${colIndex}`"
              :class="thClass(col)"
              :style="thStyle(col)"
              :rowspan="rowspan(rowIndex, col.key)"
              :colspan="colspan(rowIndex, col.key)"
              @click="col.sortable ? sortItemsBy(col) : null"
            >
              <div class="sp-table__head">
                <div v-if="col.name == sortBy" class="sp-table__sort">
                  <s-icon
                    :size="18"
                    v-if="sortOrder == 'asc'"
                    name="vmdi-chevron-up"
                  />
                  <s-icon
                    :size="18"
                    v-if="sortOrder == 'desc'"
                    name="vmdi-chevron-down"
                  />
                </div>
                <label class="sp-table__label">{{ col.label }}</label>
              </div>
            </th>
          </template>
        </tr>
      </thead>

      <!-- BODY -->
      <component
        :is="reorder ? 'draggable' : 'tbody'"
        handle=".sp-table__drag"
        tag="tbody"
        v-model="rows"
      >
        <slot name="rows-before" />

        <!-- Looping Rows -->
        <tr v-for="(row, index) in rows" :key="`sp-table-row-${index}`">
          <template v-for="(attr, attrIndex) in body">
            <!-- Looping Columns -->
            <td
              v-if="attr.visible"
              :key="`sp-table-col-${attr.name}-${attrIndex}`"
              :class="tdClass(attr)"
              @click="tdClick(attr, row)"
            >
              <!-- Override Slot -->
              <slot
                v-if="$scopedSlots[attr.name]"
                :name="attr.name"
                :item="row"
              >
                {{ row[attr.name] }}
              </slot>

              <!-- Global Slot -->
              <component
                v-else-if="OPTIONS.slots && OPTIONS.slots[attr.name]"
                :item="row"
                :is="OPTIONS.slots[attr.name]"
              />

              <!-- Index -->
              <slot v-else-if="attr.name == '_index'" name="_index" :item="row">
                <span>{{ itemIndex(index) }}</span>
              </slot>

              <!-- Drag Handle -->
              <p v-else-if="attr.name == '_drag'" class="sp-table__drag">
                <slot name="_drag" :item="row">
                  <s-icon title="Drag to Sort" name="vmdi-drag" />
                </slot>
              </p>

              <!-- Default Slot -->
              <slot v-else :name="attr.name" :item="row">
                {{ td(attr, row) }}
              </slot>
            </td>
          </template>
        </tr>

        <slot name="rows-after" />
      </component>
    </table>
  </div>
</template>

<script>
import { cloneDeep } from "lodash-es";
import layout from "../layout";

export default {
  name: "sp-list-table",
  mixins: [layout],
  props: {
    reorder: {
      type: Boolean,
      default: false,
    },
    stickyHeader: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      headers: [],
      body: [],
    };
  },

  watch: {
    allAttrs: {
      deep: true,
      handler(newValue) {
        this.$set(this, "headers", []);
        this.$set(this, "body", []);
        this.generateHeader(newValue, 0);
      },
    },
  },

  created() {
    this.generateHeader(this.allAttrs, 0);
  },

  computed: {
    rows: {
      set(value) {
        this.$emit("reorder", value);
        this.$parent.set("items", value);
      },
      get() {
        return cloneDeep(this.items);
      },
    },
  },

  methods: {
    rowspan(rowIndex, colKey) {
      let spans = 1;
      for (var i = rowIndex + 1; i < this.headers.length; i++) {
        const row = this.headers[i];
        const hasChild = row.some((item) => item.key.startsWith(colKey));
        if (hasChild) {
          return spans;
        } else {
          spans++;
        }
      }
      return spans;
    },
    colspan(rowIndex, colKey) {
      let spans = 1;
      for (var i = rowIndex + 1; i < this.headers.length; i++) {
        const row = this.headers[i];
        const items = row.filter((item) => item.key.startsWith(colKey));
        if (items && items.length > 0) {
          spans = spans + items.length - 1;
        }
      }
      return spans;
    },

    generateHeader(attrs, index, parentKey = "0") {
      if (!this.headers[index]) {
        this.$set(this.headers, index, []);
      }
      attrs.forEach((attr, attrIndex) => {
        //Render only if the attr is visible
        if (attr.visible) {
          //This unique key based on index helps to find parent-child
          //Make sure `attr` stays reactive by not extracting it but adding additional data by keys
          const uniqueKey = parentKey + "" + attrIndex;
          attr.key = uniqueKey;
          this.headers[index].push(attr);

          //If there are child elements, we need to add new row
          if (attr.attrs) {
            const newIndex = index + 1;
            this.generateHeader(attr.attrs, newIndex, uniqueKey);
          } else {
            //This helps to render body rows
            this.body.push(attr);
          }
        }
      });
    },

    thClass(attr) {
      const classList = [`sp-table__${attr.name}`];
      if (attr.name == this.sortBy) classList.push("sp-table__sort");
      if (attr.sortable) classList.push("sp-table__sortable");
      if (attr.fix) classList.push("sp-table__fix");
      if (attr.classList) classList.push(...attr.classList);
      if (attr.type) classList.push(`sp-table__${attr.type}`);
      return classList;
    },

    thStyle(attr) {
      const style = {};
      if (attr.width) style.width = attr.width;
      return style;
    },

    tdClick(attr, row) {
      if (attr.onClick) {
        attr.onClick(row);
      } else if (attr.rowClick !== false) {
        this.$emit("rowClick", row);
      }
    },

    tdClass(attr) {
      const classList = [];
      if (attr.fix) classList.push("sp-table__fix");
      if (this.$listeners.rowClick && attr.rowClick !== false)
        classList.push("sp-table__click");
      if (attr.classList) classList.push(...attr.classList);
      if (attr.type) classList.push(`sp-table__${attr.type}`);
      return classList;
    },

    td(attr, row) {
      const key = attr.name;
      // valueMap: JSON
      // User can define a key:value map for "enum values" to "human readable" form, from response.
      if (attr.valueMap) {
        const value = row[key];
        if (value && attr.valueMap[value]) {
          return attr.valueMap[value];
        }
      }

      // type: String
      // If type is provided, user can configure its value in global typeAdapter configuration.
      if (attr.type && this.OPTIONS.typeAdapters[attr.type]) {
        return this.OPTIONS.typeAdapters[attr.type](row[key], row);
      }

      // value: Function
      // If user needs to evaluate the value manually.
      if (attr.value) {
        return attr.value(row);
      }

      //If props are defined but need to display row value.
      return row[key];
    },
  },
};
</script>

<style lang="scss">
.sp-table {
  --sp-table--border-color: #{--color("grey", "lightest")};
  --sp-table--hover-color: #{transparentize(color("grey", "lightest"), 0.8)};
  padding: --space(3);
}

.sp-table--sticky-header {
  th {
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 9;
  }
}
.sp-table__table {
  width: 100%;
  border-collapse: collapse;
  border-style: hidden;
  border-bottom: 2px solid var(--sp-table--border-color);
  th,
  td {
    padding: 10px;
    border-color: var(--sp-table--border-color);
    border-style: solid;
    border-bottom-width: 1px;
    border-top-width: 1px;
    border-left-width: 0px;
    border-right-width: 0px;
    text-align: left;
    text-align: start;
    &.sp-table__number {
      text-align: end;
      text-align: right;
    }
  }
  th {
    border-bottom-width: 2px;
    font-weight: bold;
    color: --color(grey);
    font-size: 13px;
  }
  tbody {
    tr {
      &:hover {
        background-color: var(--sp-table--hover-color);
      }
    }
  }
  .col-drag {
    button {
      cursor: move !important;
    }
  }
  .sortable-ghost {
    position: relative;
    &:after {
      content: "";
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #fff8e1;
      position: absolute;
      z-index: 2;
    }
  }
}

.sp-table__head {
  display: flex;
  align-items: center;
}
.sp-table__fix {
  width: 1px;
  white-space: nowrap;
}

.sp-table__click {
  cursor: pointer;
}

.sp-table__label {
  text-align: inherit;
  flex: 1 1 auto;
}

.sp-table__sortable {
  cursor: pointer;
}
</style>
