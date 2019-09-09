<template>
  <li>
    <s-button align="left" fluid shape="rectangle" class="nav__item" v-bind="$attrs">
      <slot />
    </s-button>
  </li>
</template>

<script>
export default {
  name: "s-nav-item",
  inheritAttrs: false
};
</script>