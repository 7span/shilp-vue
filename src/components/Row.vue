<template>
  <div class="row" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "s-row",

  props: {
    gap: [Number, String, Object]
  },

  computed: {
    classes() {
      const classes = [];

      if (this.gap) {
        if (typeof this.gap === "object") {
          for (var key in this.gap) {
            if (key == "phone") {
              classes.push(`row--${this.gap[key]}`);
            } else {
              classes.push(`row--${this.gap[key]}:${key}`);
            }
          }
        } else {
          classes.push(`row--${this.gap}`);
        }
      }

      return classes;
    }
  }
};
</script>
