<template>
  <textarea class="field-block" :value="value" @input="input"></textarea>
</template>

<script>
export default {
  name: "s-textarea",

  props: {
    value: [String, Number]
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