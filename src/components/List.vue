<template>
  <div class="list" :class="blockClassList">
    <slot></slot>
  </div>
</template>

<script>
import component from "../mixins/component";
export default {
  name: "s-list",
  shilp: {
    block: "list",
    boolean: ["stack", "group", "fluid"],
    variant: ["gap"]
  },
  mixins: [component],

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
    gap: String
  }
};
</script>
