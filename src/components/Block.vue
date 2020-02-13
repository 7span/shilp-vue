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
    bgColor: String,
    bgImage: String,
    bgImageOpacity: [String, Number],
    shadow: String,
    align: String
  },
  computed: {
    classList() {
      const classes = ["block"];
      if (this.shadow) classes.push(`shadow--${this.shadow}`);
      if (this.radius) classes.push(`radius--${this.shadow}`);
      if (this.align) classes.push(`text--${this.align}`);
      if (this.bgImage || this.bgColor) classes.push(`block--bg`);
      return classes;
    },
    styleSet() {
      const styles = {};
      if (this.bgColor)
        styles["--block--bg-color"] = `var(--color--${this.bgColor})`;
      if (this.bgImage) styles["--block--bg-image"] = `url(${this.bgImage})`;
      if (this.bgImageOpacity)
        styles["--block--bg-opacity"] = this.bgImageOpacity;
      return styles;
    }
  }
};
</script>
