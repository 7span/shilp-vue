<template>
  <div class="switch" :class="blockClassList">
    <input
      :checked="isChecked"
      class="switch__input"
      type="checkbox"
      :id="id"
      @input="input($event.target.checked)"
    />
    <label :for="id" class="switch__wrapper">
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
    id: {
      type: String,
      default: "switch"
    },
    rounded: Boolean,
    color: String,
    size: String,
    shape: String,
    theme: String,
    onValue: {
      default: null
    },
    offValue: {
      default: null
    }
  },
  computed: {
    isChecked() {
      if (this.onValue) {
        return this.value == this.onValue;
      }
      return this.value;
    }
  },
  methods: {
    input(value) {
      if (value) {
        this.$emit("input", this.onValue || value);
      } else {
        this.$emit("input", this.offValue || value);
      }
    }
  }
};
</script>
