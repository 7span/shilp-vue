<template>
  <div class="choices">
    <div
      class="choice"
      :class="{ 'choice--custom': custom, 'choice--native': native }"
      v-for="(option, index) in optionsWithId"
      :key="`option--${index}`"
    >
      <input
        :name="name"
        type="radio"
        :id="option.id"
        :value="option.value"
        :checked="option.selected"
        v-model="checked"
        @change="input"
      />

      <!-- STYLE: NATIVE OR CUSTOM -->
      <label
        class="choice__label"
        :class="{ 'choice__label--checked': checked == option.value }"
        :for="option.id"
      >
        <slot :option="option" :checked="checked == option.value">
          {{ option.label }}
        </slot>
      </label>
    </div>
  </div>
</template>

<script>
import { uid } from "../utils";

export default {
  name: "s-radio",
  inheritAttrs: false,

  data() {
    return {
      checked: this.value
    };
  },

  watch: {
    value(newValue) {
      this.checked = newValue;
    }
  },

  props: {
    value: [String, Number, Boolean],
    options: Array,
    name: String,
    custom: {
      type: Boolean,
      default: false
    },
    native: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    optionsWithId() {
      const newOptions = this.options.map(item => {
        if (!item.id) {
          item.id = uid();
        }
        return item;
      });
      return newOptions;
    }
  },

  methods: {
    input() {
      let metaValue = this.options.find(item => item.value == this.checked);
      this.$emit("input", this.checked, metaValue);
    }
  }
};
</script>
