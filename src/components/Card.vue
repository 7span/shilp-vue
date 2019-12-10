<template>
  <div class="card" :class="blockClasses">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "s-card",
  mixins: [require("../mixins/component.js").default],

  props: {
    size: String,
    fluid: {
      type: Boolean,
      default: false
    },
    split: {
      type: Boolean,
      default: false
    },
    style_: String
  },

  data() {
    return {
      blockClass: "card",
      booleanClassProps: ["fluid", "split", "round"],
      variantClassProps: ["size", "style_"]
    };
  }
};
</script>
