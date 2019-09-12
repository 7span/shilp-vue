<template>
  <component :is="component" class="button" :class="classes" :to="to" :href="href">
    <s-icon v-if="icon" class="button__icon" :name="icon" />
    <span>
      <slot></slot>
    </span>
  </component>
</template>

<script>
export default {
  name: "s-button",

  props: {
    color: String,
    size: String,
    shape: String,
    style_: String,
    align: String,
    to: String,
    href: String,
    icon: String,
    loader: {
      type: Boolean,
      default: false
    },
    fluid: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    component() {
      if (this.to) {
        return "router-link";
      }
      if (this.href) {
        return "a";
      }
      return "button";
    },

    classes() {
      const classes = [];

      ["color", "size", "shape", "style_", "align"].forEach(item => {
        if (this[item]) classes.push(`button--${this[item]}`);
      });

      if (this.fluid) classes.push("button--fluid");
      if (this.loader) classes.push("loader");
      if (this.loader && this.size) classes.push(`loader--${this.size}`);

      return classes;
    }
  }
};
</script>