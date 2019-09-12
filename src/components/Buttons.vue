<template>
  <div class="buttons" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "s-buttons",
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

  computed: {
    classes() {
      let classes = [];
      ["stack", "group"].forEach(item => {
        if (this[item]) classes.push(`buttons--${item}`);
      });

      return classes;
    }
  }
};
</script>