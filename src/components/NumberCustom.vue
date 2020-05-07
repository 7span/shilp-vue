<template>
  <div class="number-custom">
    <s-button
      class="number-custom__button"
      @click.native="minus()"
      icon="Minus"
      v-bind="$attrs"
    />
    <div class="number-custom__display" :style="{ width: displayWidth }">
      {{ value }}
    </div>
    <s-button
      class="number-custom__button"
      @click.native="plus()"
      icon="Plus"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
import number from "../mixins/number";

export default {
  inheritAttrs: false,
  mixins: [number],
  props: {
    displayWidth: {
      type: String,
      default: "40px"
    }
  }
};
</script>

<style lang="scss">
.number-custom {
  display: flex;
  align-items: center;
}
.number-custom__display {
  text-align: center;
}
</style>
