<template>
  <s-button v-bind="{...$attrs,...parentProps}">
    <slot></slot>
  </s-button>
</template>
<script>
export default {
  name: "s-tab",
  inheritAttrs: false,

  props: {
    name: String
  },

  // created() {
  //   console.log(this);
  //   this.$parent.tabs.push(this.$options);
  // },

  computed: {
    //Parent Propos will be passed down to all the child nav items
    //To avoid declaration of props on each child items.
    parentProps() {
      return this.$parent.$props;
    }
  }
};
</script>