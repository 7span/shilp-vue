<template>
  <input class="field-block" :value="value" @input="input" :type="type" />
</template>

<script>
export default {
  name: "s-textbox",

  props: {
    value: [String, Number]
  },

  computed: {
    isPasswordVisible() {
      return this.$parent.$data.isPasswordVisible;
    },
    type() {
      if (
        this.$attrs.type == "password" &&
        this.$parent.$data.isPasswordVisible
      ) {
        return "text";
      }
      return this.$attrs.type;
    }
  },

  methods: {
    input(e) {
      this.$emit("input", e.target.value, {
        value: e.target.value
      });
    }
  }
};
</script>
