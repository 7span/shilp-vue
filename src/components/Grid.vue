<template>
  <div class="grid" :class="blockClasses" :style="inlineCss">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "s-grid",
  mixins: [require("../mixins/component.js").default],

  props: {
    size: String,
    gap: String
  },

  data() {
    return {
      blockClass: "grid",
      booleanClassProps: [],
      variantClassProps: ["gap"]
    };
  },

  computed: {
    inlineCss() {
      const css = {};
      if (this.size) css["--grid--size"] = this.size;
      return css;
    }
  }
};
</script>
