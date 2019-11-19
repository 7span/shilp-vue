<template>
  <div class="list" :class="blockClasses">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "s-list",
  mixins: [require("../mixins/component.js").default],

  props: {
    stack: {
      type: Boolean,
      default: false
    },
    fluid: {
      type: Boolean,
      default: false
    },
    group: {
      type: Boolean,
      default: false
    },
    size: String
  },

  data() {
    return {
      blockClass: "list",
      booleanClassProps: ["stack", "group", "fluid"],
      variantClassProps: ["size"]
    };
  }
};
</script>
