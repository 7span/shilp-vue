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
    shade: String,
    weight: String,
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
      if (this.color) {
        let className = `color--${this.color}`;
        if (this.shade) className += "--" + this.shade;
        classes.push(className);
      }
      if (this.size) classes.push(`${this.size}`);
      if (this.weight) classes.push(`fw--${this.weight}`);
      return classes;
    }
  }
};
</script>