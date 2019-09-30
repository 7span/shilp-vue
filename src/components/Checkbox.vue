<template>
  <!-- MULTIPLE CHECKBOX -->
  <div v-if="options" class="options" :class="`space space--${gap}`">
    <div class="choice" v-for="option in options">
      <input
        :name="name"
        type="checkbox"
        :id="option.id || option.value"
        :value="option.value"
        :checked="option.selected"
        v-model="checkedArray"
        @change="input"
      />
      <label
        class="choice__label"
        :class="{'choice__label--checked':checkedArray.includes(option.value)}"
        :for="option.id || option.value"
      >
        <slot :name="option.id">{{option.label}}</slot>
      </label>
    </div>
  </div>

  <!-- SINGLE CHECKBOX -->
  <div v-else class="checkbox">
    <input
      :name="name"
      v-model="checked"
      type="checkbox"
      v-bind="$attrs"
      @change="$emit('input',checked)"
    />
    <label class="choice__label" :for="$attrs.id">
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
      checkedArray: this.value || [],
      checked: this.value || false
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
      if (this.options) {
        this.$emit("input", this.checkedArray, metaValue);
      } else {
        this.$emit("input", this.checked, metaValue);
      }
    }
  }
};
</script>