<template>
  <validation-provider
    tag="div"
    class="field-validate"
    :name="name || $attrs.label"
    :rules="rules"
    v-slot="props"
  >
    <!-- 
    @validate: Manually call validate method on file fields.
    has-validation: Let's child slot components know that the field needs to be validated
    -->
    <s-field
      v-bind="$attrs"
      :message="$attrs.message || props.errors[0]"
      :style_="props.errors[0] ? 'danger' : ''"
      has-validation
      @validate="props.validate()"
    >
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="{ ...scope, ...props }" />
      </template>
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
