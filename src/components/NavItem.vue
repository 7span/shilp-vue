<template>
  <li class="nav__item">
    <label v-if="type=='label'" class="nav__label">
      <slot />
    </label>
    <s-button v-else align="left" fluid shape="rectangle" class="nav__link" v-bind="$attrs">
      <slot />
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
  }
};
</script>