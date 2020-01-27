<template>
  <validation-observer ref="formObserver" slim v-slot="props">
    <form @submit.prevent="submit()" v-bind="$attrs">
      <slot v-bind="props"></slot>
    </form>
  </validation-observer>
</template>

<script>
export default {
  name: "s-form-validate",
  inheritAttrs: false,
  methods: {
    async validate() {
      return await this.$refs.formObserver.validate();
    },
    async submit() {
      const isValid = await this.validate();
      if (isValid) this.$emit("submit");
    }
  }
};
</script>
