<template>
  <s-field v-bind="$attrs" class="number">
    <template #before>
      <s-button
        class="number__button"
        shape="square"
        @click.native="minus()"
        icon="Minus"
      />
    </template>
    <s-textbox
      class="number__input"
      :value="value"
      @input="set($event)"
      type="number"
    />
    <template #after>
      <s-button
        class="number__button"
        shape="square"
        @click.native="plus()"
        icon="Plus"
      />
    </template>
  </s-field>
</template>

<script>
import number from "../mixins/number";

export default {
  inheritAttrs: false,
  mixins: [number]
};
</script>

<style lang="scss" scoped>
.number {
  &::v-deep {
    .field__before,
    .field__after {
      padding: 0;
    }
  }
}

.number__button {
  flex: 0 0 auto;
  --button--size: calc(
    var(--field--size) - calc(var(--field--border-width) * 2)
  );
  --button--color: #{--color(grey)};
  --button--hover-color: #{--color(grey, darkest)};
}

.number__input {
  text-align: center;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }
}
</style>
