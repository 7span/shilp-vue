<template>
  <div class="card__media" :class="blockClasses">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "s-card-media",
  mixins: [require("../mixins/component.js").default],

  props: {
    edge: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      blockClass: "card__media",
      booleanClassProps: ["edge"]
    };
  }
};
</script>