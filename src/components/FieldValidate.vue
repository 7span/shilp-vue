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
//TODO: Make this component optional and don't include in default plugin.
import { ValidationProvider } from "vee-validate";

export default {
  name: "s-field-validate",
  inheritAttrs: false,

  props: {
    rules: [String, Object],
    name: String
  }
};
</script>