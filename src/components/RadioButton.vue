<template>
  <s-button-group class="radio-button" v-bind="$attrs">
    <input
      v-for="(option, index) in optionsWithId"
      :name="name"
      :key="`input--${index}`"
      type="radio"
      :id="option.id"
      :value="option.value"
      :checked="option.selected"
      v-model="checked"
      @change="input"
    />
    <template v-for="(option, index) in optionsWithId">
      <s-button
        :for="option.id"
        :active="checked == option.value"
        :key="`button--${index}`"
        :theme="checked == option.value ? activeTheme : inactiveTheme"
        :color="checked == option.value ? activeColor : inactiveColor"
        :icon="
          option.icon || (checked == option.value ? activeIcon : inactiveIcon)
        "
        :emoji="
          option.emoji ||
            (checked == option.value ? activeEmoji : inactiveEmoji)
        "
      >
        {{ option.label }}
      </s-button>
    </template>
  </s-button-group>
</template>

<script>
import { uid } from "../utils";

export default {
  name: "s-radio-button",
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
    options: { type: Array, required: true },
    name: String,
    activeColor: {
      type: String,
      default: "primary"
    },
    inactiveColor: {
      type: String,
      default: "primary"
    },
    activeTheme: {
      type: String,
      default: "solid"
    },
    inactiveTheme: {
      type: String,
      default: "outline"
    },
    activeIcon: {
      type: String,
      default: null
    },
    activeEmoji: {
      type: String,
      default: null
    },
    inactiveIcon: {
      type: String,
      default: null
    },
    inactiveEmoji: {
      type: String,
      default: null
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
    },
    classes() {
      const classes = [];
      if (this.component == "button") {
        classes.push("buttons", `buttons--group`);
      }
      return classes;
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

<style lang="scss">
.radio-button {
  input[type="radio"] {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
}
</style>
