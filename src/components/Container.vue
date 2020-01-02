<template>
  <component :is="tag" :class="classList">
    <slot></slot>
  </component>
</template>
<script>
export default {
  props: {
    tag: {
      type: String,
      default: "div"
    },
    bg: String,
    shadow: String
  },
  computed: {
    classList() {
      const classes = [];
      if (this.bg) classes.push(`bg--${this.bg}`);
      if (this.shadow) classes.push(`shadow--${this.shadow}`);
      if (this.radius) classes.push(`radius--${this.shadow}`);
      return classes;
    }
  }
};
</script>
