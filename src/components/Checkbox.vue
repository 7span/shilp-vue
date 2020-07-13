<template>
  <!-- MULTIPLE CHECKBOX -->
  <div v-if="options" class="options" :class="`space space--${gap}`">
    <div
      class="choice"
      v-for="(option, index) in options"
      :key="`option--${index}`"
    >
      <input
        :name="name"
        type="checkbox"
        :id="optionId(option)"
        :value="option.value"
        :checked="option.selected"
        v-model="checkedArray"
        @change="input"
      />
      <label
        class="choice__label"
        :class="{
          'choice__label--checked': checkedArray.includes(option.value),
        }"
        :for="optionId(option)"
      >
        <slot :name="optionId(option)">{{ option.label }}</slot>
      </label>
    </div>
  </div>

  <!-- SINGLE CHECKBOX -->
  <div v-else class="checkbox">
    <input
      v-bind="$attrs"
      :name="name"
      :id="id"
      v-model="checked"
      type="checkbox"
      @change="$emit('input', checked)"
    />
    <label class="choice__label" :for="id">
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>

<script>
export default {
  name: "s-checkbox",
  inheritAttrs: false,

  data() {
    return {
      checkedArray: this.value || [],
      checked: this.value || false,
    };
  },

  props: {
    value: [Array, String, Number, Boolean],
    options: Array,
    name: String,
    label: String,
    id: String,
    gap: {
      type: String,
      default: "md",
    },
  },

  methods: {
    optionId(option) {
      return option.id || option.value;
    },
    input() {
      if (this.options) {
        const metaValue = this.options.filter((item) =>
          this.checkedArray.includes(item.value)
        );
        this.$emit("input", this.checkedArray, metaValue);
      } else {
        this.$emit("input", this.checked, this.checked);
      }
    },
  },
};
</script>
