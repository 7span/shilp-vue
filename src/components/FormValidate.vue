<template>
  <validation-observer ref="form" slim v-slot="props">
    <form @submit="$emit('submit')" v-bind="$attrs">
      <slot v-bind="props"></slot>
    </form>
  </validation-observer>
</template>

<script>
export default {
  name: "s-form-validate",
  inheritAttrs: false,
  methods: {
    validate() {
      return this.$refs.form.validate();
    }
  }
};
</script>
