<template>
  <div class="item" :class="blockClasses">
    <div class="item__media">
      <slot name="media"></slot>
    </div>
    <div class="item__body">
      <component :is="titleTag" v-if="title" class="item__title">{{title}}</component>
      <div class="item__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "s-item",
  mixins: [require("../mixins/component.js").default],

  props: {
    title: String,
    titleTag: {
      type: String,
      default: "h4"
    },
    size: String
  },

  data() {
    return {
      blockClass: "item",
      variantClassProps: ["size"]
    };
  }
};
</script>

