<template>
  <div class="v-list__meta">
    <!-- SHOW COUNTS -->
    <p class="v-list__results" v-if="items.length > 0">
      <slot name="metadata" :showing="showing" :count="count">
        Showing {{ showing }} items out of {{ count }}
      </slot>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    showing() {
      return this.items.length;
    },
  },
};
</script>

<style lang="scss">
.v-list__results {
  text-align: center;
  font-size: 12px;
  color: --color(grey);
}
</style>
