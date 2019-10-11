<template>
  <ul class="nav" :class="blockClasses">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: "s-nav",
  mixins: [require("../mixins/component.js").default],

  props: {
    stack: {
      type: Boolean,
      default: false
    },
    color: String,
    size: String,
    shape: String,
    style_: String,
    align: String,
    fluid: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      blockClass: "nav",
      booleanClassProps: ["stack", "fluid"],
      variantClassProps: ["color", "size", "shape", "style_", "align"]
    };
  }
};
</script>
