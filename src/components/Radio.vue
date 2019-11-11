<template>
  <div class="choices" :class="classes">
    <div
      class="choice"
      :class="{'choice--custom':custom || component}"
      v-for="(option,index) in options"
      :key="`option--${index}`"
    >
      <input
        :name="name"
        type="radio"
        :id="optionId(option)"
        :value="option.value"
        :checked="option.selected"
        v-model="checked"
        @change="input"
      />

      <!-- STYLE: BUTTON -->
      <s-button
        v-if="component=='button'"
        v-bind="$attrs"
        :for="optionId(option)"
        :style_="checked == option.value ? 'solid' : buttonInactiveStyle"
      >{{option.label}}</s-button>

      <!-- STYLE: NATIVE OR CUSTOM -->
      <label
        v-else
        class="choice__label"
        :class="{'choice__label--checked':checked == option.value}"
        :for="optionId(option)"
      >
        <slot :name="optionId(option)" :option="option" :checked="checked == option.value">{{option.label}}</slot>
      </label>
    </div>
  </div>
</template>

<script>
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
    component: String,
    gap: {
      type: String,
      default: "md"
    },
    custom: {
      type: Boolean,
      default: false
    },
    buttonInactiveStyle: {
      type: String,
      default: "outline"
    }
  },

  computed: {
    
    classes() {
      const classes = [];
      if (!this.component && !this.custom) {
        classes.push("space", `space--${this.gap}`);
      }
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
    },

    optionId(option){
      return option.id || option.value
    },
  }
};
</script>
