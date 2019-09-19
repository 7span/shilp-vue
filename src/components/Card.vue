<template>
  <div class="card" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "s-card",

  props: {
    size: String,
    fluid: {
      type: Boolean,
      default: false
    },
    style_: String
  },

  computed: {
    classes() {
      let classes = [];
      ["size", "style_"].forEach(item => {
        if (this[item]) classes.push(`card--${this[item]}`);
      });

      if (this.fluid) classes.push(`card--fluid`);
      return classes;
    }
  }
};
</script>