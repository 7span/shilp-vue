<template>
  <validation-provider
    tag="div"
    class="field-validate"
    :name="name || $attrs.label"
    :rules="rules"
    v-slot="props"
  >
    <s-field v-bind="$attrs" :error-message="props.errors[0]">
      <slot v-bind="props"></slot>
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