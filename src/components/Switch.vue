<template>
  <div class="switch" :class="blockClassList">
    <input
      :checked="isChecked"
      class="switch__input"
      type="checkbox"
      id="switch"
      @input="input($event.target.checked)"
    />
    <label for="switch" class="switch__wrapper">
      <div class="switch__indicator"></div>
    </label>
  </div>
</template>

<script>
import component from "../mixins/component.js";

export default {
  name: "s-switch",
  shilp: {
    block: "switch",
    boolean: ["rounded"],
    variant: ["color", "size", "shape", "theme"]
  },
  mixins: [component],
  props: {
    value: {},
    rounded: Boolean,
    color: String,
    size: String,
    shape: String,
    theme: String,
    checkedValue: {
      default: null
    },
    uncheckedValue: {
      default: null
    }
  },
  computed: {
    isChecked() {
      if (this.checkedValue) {
        return this.value == this.checkedValue;
      }
      return this.value;
    }
  },
  methods: {
    input(value) {
      if (value) {
        this.$emit("input", this.checkedValue || value);
      } else {
        this.$emit("input", this.uncheckedValue || value);
      }
    }
  }
};
</script>
