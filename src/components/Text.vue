<template>
  <component :is="tag" :class="blockClasses">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: "s-text",
  mixins: [require("../mixins/component.js").default],

  props: {
    color: String,
    size: String,
    tag: {
      type: String,
      default: "p"
    }
  },

  data() {
    return {
      blockClass: "",
      booleanClassProps: [],
      variantClassProps: []
    };
  },

  computed: {
    addBlockClasses() {
      const classes = [];
      if (this.color) classes.push(`color--${this.color}`);
      if (this.size) classes.push(`${this.size}`);
      return classes;
    }
  }
};
</script>