<template>
  <div class="column" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "s-column",

  props: {
    size: [String, Number, Object],
    order: [String, Number, Object]
  },

  computed: {
    classes() {
      const classes = [];

      if (this.size) {
        if (typeof this.size === "number" || typeof this.size === "string") {
          classes.push(`column--${this.size}`);
        } else if (typeof this.size === "object") {
          for (var size in this.size) {
            if (size == "phone") {
              classes.push(`column--${this.size[size]}`);
            } else {
              classes.push(`column--${this.size[size]}:${size}`);
            }
          }
        }
      }

      if (this.order) {
        if (typeof this.order === "number" || typeof this.order === "string") {
          classes.push(`o-${this.order}`);
        } else if (typeof this.order === "object") {
          for (var order in this.order) {
            if (order == "phone") {
              classes.push(`o-${this.order[order]}`);
            } else {
              classes.push(`o-${this.order[order]}:${order}`);
            }
          }
        }
      }

      return classes;
    }
  }
};
</script>
