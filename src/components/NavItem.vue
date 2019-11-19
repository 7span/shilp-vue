<template>
  <li class="nav__item">
    <label v-if="type == 'label'" class="nav__label">
      <slot />
    </label>
    <s-button v-else class="nav__link" v-bind="{ ...$attrs, ...parentProps }">
      <span class="button__label">
        <slot />
      </span>
    </s-button>
    <slot name="nav"></slot>
  </li>
</template>

<script>
export default {
  name: "s-nav-item",
  inheritAttrs: false,

  props: {
    label: String,
    type: {
      type: String,
      default: "button"
    }
  },
  computed: {
    //Parent Propos will be passed down to all the child nav items
    //To avoid declaration of props on each child items.
    parentProps() {
      return this.$parent.$props;
    }
  }
};
</script>
