<template>
  <div v-if="options" class="options" :class="`space space--${gap}`">
    <div class="checkbox" v-for="option in options">
      <input
        :name="name"
        type="checkbox"
        :id="option.id || option.value"
        :value="option.value"
        :checked="option.selected"
        v-model="checked"
        @change="input"
      />
      <label :for="option.id || option.value">{{option.label}}</label>
    </div>
  </div>

  <div v-else class="checkbox">
    <input
      :name="name"
      v-model="checked"
      type="checkbox"
      v-bind="$attrs"
      @change="$emit('input',checked)"
    />
    <label :for="$attrs.id">
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  name: "s-checkbox",
  inheritAttrs: false,

  data() {
    return {
      checked: this.value
    };
  },

  props: {
    value: [Array, String, Number, Boolean],
    options: Array,
    name: String,
    gap: {
      type: String,
      default: "md"
    }
  },

  methods: {
    input(e) {
      let metaValue = this.options.filter(item =>
        this.checked.includes(item.value)
      );
      this.$emit("input", this.checked, metaValue);
    }
  }
};
</script>