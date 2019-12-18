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
    weight: String,
    italic: Boolean,
    underline: Boolean,
    align: String,
    tag: {
      type: String,
      default: "p"
    }
  },

  data() {
    return {
      blockClass: "text",
      booleanClassProps: ["italic", "underline"],
      variantClassProps: ["size", "weight", "color", "align"]
    };
  }
};
</script>
