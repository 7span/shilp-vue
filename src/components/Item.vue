<template>
  <div class="item" :class="classes">
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

  props: {
    title: String,
    titleTag: {
      type: String,
      default: "h4"
    },
    size: String
  },
  computed: {
    classes() {
      const classes = [];
      ["size"].forEach(item => {
        if (this[item]) classes.push(`item--${this[item]}`);
      });
      return classes;
    }
  }
};
</script>

