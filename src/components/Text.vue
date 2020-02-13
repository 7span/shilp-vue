<template>
  <component :is="tag" :class="blockClassList">
    <slot></slot>
  </component>
</template>

<script>
import component from "../mixins/component";
export default {
  name: "s-text",
  shilp: {
    block: "text",
    boolean: ["italic", "underline", "strikethrough"],
    variant: ["size", "weight", "color", "align"]
  },
  mixins: [component],

  props: {
    color: String,
    size: String,
    weight: String,
    italic: Boolean,
    underline: Boolean,
    align: String,
    strikethrough: Boolean,
    tag: {
      type: String,
      default: "p"
    }
  }
};
</script>
