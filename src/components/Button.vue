<template>
  <component :is="component" class="button" :class="blockClasses" v-bind="$attrs">
    <s-icon v-if="icon" class="button__icon" :name="icon" />
    <span>
      <slot></slot>
    </span>
  </component>
</template>

<script>
export default {
  name: "s-button",
  mixins: [require("../mixins/component.js").default],

  props: {
    color: String,
    size: String,
    shape: String,
    style_: String,
    align: String,
    icon: String,
    loader: {
      type: Boolean,
      default: false
    },
    loaderColor: {
      type: String,
      default: "light"
    },
    fluid: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      blockClass: "button",
      booleanClassProps: ["fluid"],
      variantClassProps: ["color", "size", "shape", "style_", "align"]
    };
  },

  computed: {
    component() {
      if (this.$attrs.to) {
        return "router-link";
      }
      if (this.$attrs.href) {
        return "a";
      }
      if (this.$attrs.for) {
        return "label";
      }
      return "button";
    },

    addBlockClasses() {
      const classes = [];
      if (this.loader) classes.push("loader", `loader--${this.loaderColor}`);
      if (this.loader && this.size) classes.push(`loader--${this.size}`);
      return classes;
    }
  }
};
</script>