<template>
  <validation-observer slim v-slot="props">
    <form @submit="$emit('submit')" v-bind="$attrs">
      <slot v-bind="props"></slot>
    </form>
  </validation-observer>
</template>

<script>
export default {
  name: "s-form-validate",
  inheritAttrs: false
};
</script>
