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
    boolean: [], // Uses block name as prefix and key as suffix
    variant: [], // Uses block name as prefix and value as suffix
    utilityBoolean: ["italic", "underline", "strikethrough", "uppercase"],
    utilityVariant: ["size", "color", "weight", "align"]
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
    lineHeight: String,
    uppercase: Boolean,
    numeric: Boolean,
    tag: {
      type: String,
      default: "p"
    }
  }
};
</script>
