<template>
  <s-button
    v-bind="{ ...$attrs, ...parentProps }"
    :icon="$attrs.icon"
    @click.native="$parent.change(name)"
    :class="{ 'button--active': activeTab == name }"
  >
    <slot></slot>
  </s-button>
</template>
<script>
export default {
  name: "s-tab-item",
  inheritAttrs: false,

  props: {
    name: { type: String, required: true }
  },

  computed: {
    //Parent Propos will be passed down to all the child nav items
    //To avoid declaration of props on each child items.
    parentProps() {
      return this.$parent.$props;
    },

    activeTab() {
      return this.$parent.activeTab;
    }
  }
};
</script>
