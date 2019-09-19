<template>
  <div class="options" :class="`gx--${gap}`">
    <div class="radio" v-for="option in options">
      <input
        :name="name"
        type="radio"
        :id="option.id || option.value"
        :value="option.value"
        :checked="option.selected"
        v-model="checked"
        @change="input"
      />
      <label :for="option.id || option.value">{{option.label}}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "s-radio",

  data() {
    return {
      checked: this.value
    };
  },
  props: {
    value: [String, Boolean],
    options: Array,
    name: String,
    gap: {
      type: String,
      default: "md"
    }
  },

  methods: {
    input(e) {
      let metaValue = this.options.find(item => item.value == this.checked);
      this.$emit("input", this.checked, metaValue);
    }
  }
};
</script>