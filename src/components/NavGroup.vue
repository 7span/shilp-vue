<template>
  <li>
    <s-button fluid align="left" class="nav__label" v-bind="$attrs">{{label}}</s-button>
    <ul class="nav__group">
      <slot />
    </ul>
  </li>
</template>

<script>
export default {
  name: "s-nav-group",
  inheritAttrs: false,

  props: {
    label: String
  }
};
</script>

<style lang="scss" scoped>
.nav__group {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 0;
}
</style>