<template>
  <li class="nav__item">
    <label v-if="label" class="nav__label">{{label}}</label>
    <s-button
      v-if="$slots.default"
      align="left"
      fluid
      shape="rectangle"
      class="nav__link"
      v-bind="$attrs"
    >
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
    label: String
  }
};
</script>