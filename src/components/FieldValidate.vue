<template>
  <validation-provider
    tag="div"
    class="field-validate"
    :name="name || $attrs.label"
    :rules="rules"
    v-slot="{ errors }"
  >
    <s-field v-bind="$attrs" :error-message="errors[0]">
      <slot></slot>
    </s-field>
  </validation-provider>
</template>

<script>
export default {
  name: "s-field-validate",
  inheritAttrs: false,

  props: {
    rules: [String, Object],
    name: String
  }
};
</script>