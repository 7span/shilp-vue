<template>
  <div class="row" :class="classes">
    <template v-if="!columns">
      <slot></slot>
    </template>

    <template v-else>
      <template v-for="(column, index) in config">
        <s-column :key="`column-${index}`" :size="column.config">
          <slot :name="slotName(index)" :index="index" :data="column.data" />
        </s-column>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "s-row",

  props: {
    gap: [Number, String, Object],
    columns: [Array, Object],
    //Required if object provided in columns
    columnsCount: {
      type: Number,
      default: 1
    },
    columnsData: {
      type: Array,
      default: () => []
    },
    reverse: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    config() {
      let columns = [];
      if (this.repeater) {
        for (var i = 0; i < this.columnsCount; i++) {
          columns.push({
            config: this.columns,
            data: this.columnsData[i] || this.columnsData[0]
          });
        }
      } else {
        this.columns.forEach((config, i) => {
          columns.push({
            config: config,
            data: this.columnsData[i] || this.columnsData[0]
          });
        });
      }

      if (this.reverse) {
        return columns.reverse();
      } else {
        return columns;
      }
    },

    repeater() {
      return !Array.isArray(this.columns);
    },
    count() {
      if (this.repeater) {
        return this.columnsCount;
      } else {
        return this.columns.length;
      }
    },

    classes() {
      const classes = [];

      if (this.gap) {
        if (typeof this.gap === "object") {
          for (var key in this.gap) {
            if (key == "phone") {
              classes.push(`g-${this.gap[key]}`);
            } else {
              classes.push(`g-${this.gap[key]}:${key}`);
            }
          }
        } else {
          classes.push(`g-${this.gap}`);
        }
      }
      return classes;
    }
  },

  methods: {
    slotName(index) {
      if (this.repeater) {
        return "default";
      } else {
        if (this.reverse) {
          return this.columns.length - index;
        } else {
          return index + 1;
        }
      }
    }
  }
};
</script>
