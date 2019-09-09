<template>
  <div v-if="options" class="options" :class="`gx--${gap}`">
    <div class="checkbox" v-for="option in options">
      <input
        :name="name"
        type="checkbox"
        :id="option.id"
        :value="option.value"
        :checked="option.selected"
      />
      <label :for="option.id">{{option.label}}</label>
    </div>
  </div>

  <div v-else class="checkbox">
    <input :name="name" type="checkbox" v-bind="$attrs" />
    <label :for="$attrs.id">
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  name: "s-checkbox",
  inheritAttrs: false,

  props: {
    options: Array,
    name: String,
    gap: {
      type: String,
      default: "md"
    }
  }
};
</script>