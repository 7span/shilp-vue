<template>
  <ul class="nav">
    <slot />
  </ul>
</template>

<script>
export default {
  name: "s-nav"
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 0;
}
</style>