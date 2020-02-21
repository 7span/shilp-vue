<template>
  <textarea class="field-block" v-model="mValue"></textarea>
</template>

<script>
export default {
  name: "s-textarea",

  props: {
    value: [String, Number]
  },

  computed: {
    mValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value, {
          value: value
        });
      }
    }
  }
};
</script>
