<template>
  <div class="buttons" :class="blockClasses">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "s-buttons",
  mixins: [require("../mixins/component.js").default],

  props: {
    stack: {
      type: Boolean,
      default: false
    },
    group: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      blockClass: "buttons",
      booleanClassProps: ["stack", "group"]
    };
  }
};
</script>