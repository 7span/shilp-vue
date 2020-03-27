<template>
  <!-- <div class="number">
    <s-button
      class="number__button"
      v-bind="$attrs"
      @click.native="plus()"
      icon="Plus"
    />
    <s-textbox
      class="number__input"
      :value="value"
      @input="set($event)"
      type="number"
    />
    <s-button
      class="number__button"
      v-bind="$attrs"
      @click.native="minus()"
      icon="Minus"
    />
  </div> -->

  <s-field class="number">
    <template #before>
      <s-button
        class="number__button"
        shape="square"
        @click.native="plus()"
        icon="Plus"
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
        @click.native="minus()"
        icon="Minus"
      />
    </template>
  </s-field>
</template>

<script>
export default {
  props: {
    value: Number,
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 10
    }
  },
  methods: {
    set(value) {
      if (value <= this.max && value >= this.min) {
        this.$emit("input", value);
      }
    },
    plus() {
      if (this.value < this.max) {
        this.$emit("input", this.value + 1);
      }
    },
    minus() {
      if (this.value > this.min) {
        this.$emit("input", this.value - 1);
      }
    }
  }
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
}
</style>
