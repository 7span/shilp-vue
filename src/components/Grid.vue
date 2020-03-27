<template>
  <div class="grid" :class="blockClassList">
    <slot></slot>
  </div>
</template>

<script>
import component from "../mixins/component";
export default {
  name: "s-grid",
  shilp: {
    block: "grid",
    boolean: [],
    variant: ["size"]
  },
  mixins: [component],

  props: {
    size: String
  },

  computed: {
    // inlineCss() {
    //   const css = {};
    //   if (this.size) css["--grid--size"] = this.size;
    //   return css;
    // }
  }
};
</script>
