<template>
  <ul class="nav" :class="blockClassList">
    <slot></slot>
  </ul>
</template>

<script>
import component from "../mixins/component";
export default {
  name: "s-nav",
  shilp: {
    block: "nav",
    boolean: ["stack", "fluid", "group"],
    variant: ["color", "size", "shape", "theme", "align"]
  },
  mixins: [component],

  props: {
    stack: {
      type: Boolean,
      default: false
    },
    group: {
      type: Boolean,
      default: false
    },
    color: String,
    size: String,
    shape: String,
    theme: String,
    align: String,
    fluid: {
      type: Boolean,
      default: false
    },
    activeColor: String
  }
};
</script>
