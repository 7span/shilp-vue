<template>
  <div class="row" :class="classes">
    <template v-if="!columns">
      <slot></slot>
    </template>

    <template v-else>
      <template v-for="i in count">
        <s-column :key="`column-${i - 1}`" :size="config(i - 1)">
          <slot :index="i - 1" :data="columnsData[i - 1] || columnsData[0]" />
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
    }
  },

  computed: {
    count() {
      if (Array.isArray(this.columns)) {
        return this.columns.length;
      } else {
        return this.columnsCount;
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
    config(n) {
      if (Array.isArray(this.columns)) {
        return this.columns[n];
      } else {
        return this.columns;
      }
    }
  }
};
</script>
