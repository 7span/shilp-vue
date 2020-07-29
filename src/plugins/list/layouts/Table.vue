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
              @click="sortItemsBy(col)"
            >
              <div class="sp-table__head">
                <label>{{ col.label }}</label>
                <div v-if="col.name == sortBy" class="sp-table__sort">
                  <s-icon v-if="sortOrder == 'asc'" name="ChevronUp" />
                  <s-icon v-if="sortOrder == 'desc'" name="ChevronDown" />
                </div>
              </div>
            </th>
          </template>
        </tr>
      </thead>

      <!-- BODY -->
      <component
        :is="sortable ? 'draggable' : 'tbody'"
        handle=".sp-table__sort"
        tag="tbody"
        v-model="rows"
        @change="change($event)"
      >
        <!-- Looping Rows -->
        <tr v-for="(row, index) in rows" :key="`sp-table-row-${index}`">
          <template v-for="(attr, attrIndex) in body">
            <!-- Looping Columns -->
            <td
              v-if="attr.visible"
              :key="`sp-table-col-${attr.name}-${attrIndex}`"
              :class="tdClass(attr)"
              @click="attr.click !== false && $emit('rowClick', row)"
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
              <p v-else-if="attr.name == '_sort'" class="sp-table__sort">
                <slot name="_sort" :item="row">
                  <s-icon title="Drag to Sort" name="drag"></s-icon>
                </slot>
              </p>

              <!-- Default Slot -->
              <slot v-else :name="attr.name" :item="row">
                {{ td(attr, row) }}
              </slot>
            </td>
          </template>
        </tr>
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
    sortable: {
      type: Boolean,
      default: false
    },
    stickyHeader: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      headers: [],
      body: []
    };
  },

  watch: {
    allAttrs: {
      deep: true,
      handler(newValue) {
        this.$set(this, "headers", []);
        this.$set(this, "body", []);
        this.generateHeader(newValue, 0);
      }
    }
  },

  created() {
    this.generateHeader(this.allAttrs, 0);
  },

  computed: {
    rows: {
      set(value) {
        this.$emit("new", value);
        this.$parent.set("items", value);
      },
      get() {
        return cloneDeep(this.items);
      }
    }
  },

  methods: {
    rowspan(rowIndex, colKey) {
      let spans = 1;
      for (var i = rowIndex + 1; i < this.headers.length; i++) {
        const row = this.headers[i];
        const hasChild = row.some(item => item.key.startsWith(colKey));
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
        const items = row.filter(item => item.key.startsWith(colKey));
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

    change(data) {
      this.$emit("sort", data);
    },
    thClass(attr) {
      const classList = [`sp-table__${attr.name}`];
      if (attr.name == this.sortBy) classList.push("sp-table__sort");
      if (attr.fix) classList.push("sp-table__fix");
      return classList;
    },
    thStyle(attr) {
      const style = {};
      if (attr.width) style.width = attr.width;
      return style;
    },
    tdClass(attr) {
      const classList = [];
      if (attr.fix) classList.push("sp-table__fix");
      if (this.$listeners.rowClick && attr.click !== false)
        classList.push("sp-table__click");
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
    }
  }
};
</script>

<style lang="scss">
.sp-table {
  --sp-table--border-color: #{--color(grey, lightest)};
  --sp-table--hover-color: rgba(0, 0, 0, 0.03);
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
    text-align: start;
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
  label {
    flex: 0 0 auto;
    cursor: pointer;
  }
}
.sp-table__fix {
  width: 1px;
  white-space: nowrap;
}

.sp-table__click {
  cursor: pointer;
}
</style>
