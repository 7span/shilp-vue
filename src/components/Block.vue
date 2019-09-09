<template>
  <div class="block" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "s-block",

  props: {
    size: [String, Number, Object]
  },

  computed: {
    classes() {
      const classes = [];

      if (this.size) {
        if (typeof this.size === "number" || typeof this.size === "string") {
          classes.push(`block--${this.size}`);
        } else if (typeof this.size === "object") {
          for (var key in this.size) {
            if (key == "phone") {
              classes.push(`block--${this.size[key]}`);
            } else {
              classes.push(`block--${this.size[key]}:${key}`);
            }
          }
        }
      }

      return classes;
    }
  }
};
</script>