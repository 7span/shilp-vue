<template>
  <div id="app">
    <s-blocks>
      <s-block :size="6">1</s-block>
      <s-block :size="{phone:12,desktop:6}">2</s-block>
      <s-block>3</s-block>
    </s-blocks>

    <s-button color="secondary">Hello</s-button>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
</style>
