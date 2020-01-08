<template>
  <component :is="tag" :class="classList" :style="styleSet">
    <slot></slot>
  </component>
</template>
<script>
export default {
  name: "s-block",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    bg: String,
    bgImage: String,
    shadow: String
  },
  computed: {
    classList() {
      const classes = ["block"];
      if (this.bg) classes.push(`bg--${this.bg}`);
      if (this.shadow) classes.push(`shadow--${this.shadow}`);
      if (this.radius) classes.push(`radius--${this.shadow}`);
      // if (this.bgImage) classes.push(`block--cover`);
      return classes;
    },
    styleSet() {
      const styles = {};
      if (this.bgImage) styles.backgroundImage = `url(${this.bgImage})`;
      return styles;
    }
  }
};
</script>
