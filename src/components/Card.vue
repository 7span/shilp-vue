<template>
  <div class="card" :class="blockClassList">
    <slot></slot>
  </div>
</template>

<script>
import component from "../mixins/component";
export default {
  name: "s-card",
  shilp: {
    block: "card",
    boolean: ["fluid", "split", "round"],
    variant: ["gap", "theme"]
  },
  mixins: [component],

  props: {
    gap: String,
    fluid: {
      type: Boolean,
      default: false
    },
    split: {
      type: Boolean,
      default: false
    },
    theme: String
  }
};
</script>
