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
          for (var key in this.size) {
            if (key == "phone") {
              classes.push(`column--${this.size[key]}`);
            } else {
              classes.push(`column--${this.size[key]}:${key}`);
            }
          }
        }
      }

      if (this.order) {
        if (typeof this.order === "number" || typeof this.order === "string") {
          classes.push(`o-${this.order}`);
        } else if (typeof this.order === "object") {
          for (var key in this.order) {
            if (key == "phone") {
              classes.push(`o-${this.order[key]}`);
            } else {
              classes.push(`o-${this.order[key]}:${key}`);
            }
          }
        }
      }

      return classes;
    }
  }
};
</script>
