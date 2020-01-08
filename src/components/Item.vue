<template>
  <div class="item" :class="blockClassList">
    <div class="item__media">
      <slot name="media"></slot>
    </div>
    <div class="item__body">
      <component :is="titleTag" v-if="title" class="item__title">{{ title }}</component>
      <div class="item__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import component from "../mixins/component";
export default {
  name: "s-item",
  shilp: {
    block: "item",
    variant: ["size"]
  },

  mixins: [component],

  props: {
    title: String,
    titleTag: {
      type: String,
      default: "h4"
    },
    size: String
  }
};
</script>
