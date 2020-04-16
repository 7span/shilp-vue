<template>
  <div class="v-list-table">
    <table
      class="v-list-table__table"
      :class="{ 'v-list-table--row-click': $listeners.rowClick }"
    >
      <!-- HEADER -->
      <thead>
        <tr>
          <template v-for="attr in allAttrs">
            <th
              v-if="attr.visible"
              :key="`v-list-table-header-${attr.name}`"
              :class="thClass(attr)"
              :style="thStyle(attr)"
              @click="sortItemsBy(attr)"
            >
              <div class="v-list__head">
                <label>{{ attr.label }}</label>
                <div v-if="attr.name == sortBy" class="v-list__sort-icon">
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
        handle=".v-list-table__sort"
        tag="tbody"
        v-model="rows"
        @change="change($event)"
      >
        <!-- Looping Rows -->
        <tr
          v-for="(row, index) in rows"
          :key="`v-list-table-row-${index}`"
          @click="$emit('rowClick', row)"
        >
          <template v-for="attr in allAttrs">
            <!-- Looping Columns -->
            <td
              v-if="attr.visible"
              :key="`v-list-table-col-${attr.name}`"
              :class="tdClass(attr)"
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
              <p v-else-if="attr.name == '_sort'" class="v-list-table__sort">
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
import { cloneDeep } from "lodash";
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
      const classList = [`v-list-table__${attr.name}`];
      if (attr.name == this.sortBy) classList.push("v-list-table__sort");
      if (attr.fix) classList.push("v-list-table__fix");
      return classList;
    },
    thStyle(attr) {
      const style = {};
      if (attr.width) style.width = attr.width;
      return style;
    },
    tdClass(attr) {
      const classList = [];
      if (attr.fix) classList.push("v-list-table__fix");
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

<style lang="scss" scoped>
.v-list-table {
  --v-list-table--border-color: #{--color(grey, lightest)};
  --v-list-table--hover-color: rgba(0, 0, 0, 0.03);
  padding: --space(3);
}
.v-list-table__table {
  width: 100%;
  border-collapse: collapse;
  border-style: hidden;
  border-bottom: 2px solid var(--v-list-table--border-color);
  th,
  td {
    padding: 10px;
    border-color: var(--v-list-table--border-color);
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
        background-color: var(--v-list-table--hover-color);
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

.v-list-table--row-click {
  tr {
    cursor: pointer;
  }
}

.v-list__head {
  display: flex;
  align-items: center;
  label {
    flex: 0 0 auto;
    cursor: pointer;
  }
}
.v-list-table__fix {
  width: 1px;
  white-space: nowrap;
}
</style>
