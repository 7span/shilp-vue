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
    }
  },

  computed: {
    classes() {
      let classes = [];
      if (this.size) classes.push(`card--${this.size}`);
      if (this.fluid) classes.push(`card--fluid`);
      return classes;
    }
  }
};
</script>