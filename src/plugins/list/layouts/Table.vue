<template>
  <div class="sp-table">
    <table class="sp-table__table">
      <!-- HEADER -->
      <thead>
        <tr>
          <template v-for="attr in allAttrs">
            <th
              v-if="attr.visible"
              :key="`sp-table-header-${attr.name}`"
              :class="thClass(attr)"
              :style="thStyle(attr)"
              @click="sortItemsBy(attr)"
            >
              <div class="sp-table__head">
                <label>{{ attr.label }}</label>
                <div v-if="attr.name == sortBy" class="sp-table__sort">
                  <s-icon v-if="sortOrder == 'asc'" name="ChevronUp"></s-icon>
                  <s-icon
                    v-if="sortOrder == 'desc'"
                    name="ChevronDown"
                  ></s-icon>
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
          <template v-for="attr in allAttrs">
            <!-- Looping Columns -->
            <td
              v-if="attr.visible"
              :key="`sp-table-col-${attr.name}`"
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
    }
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
