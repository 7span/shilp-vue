<template>
  <div class="card__media" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "s-card-media",

  props: {
    edge: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes() {
      let classes = [];
      if (this.edge) classes.push(`card__media--edge`);
      return classes;
    }
  }
};
</script>