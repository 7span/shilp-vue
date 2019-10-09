<template>
  <div class="alert" :class="blockClasses">
    <s-icon v-if="icon" class="alert__icon" :name="icon"></s-icon>
    <p class="alert__body">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "s-alert",
  mixins: [require("../mixins/component.js").default],
  data() {
    return {
      blockClass: "alert",
      booleanClassProps: ["fluid"],
      variantClassProps: ["color", "size", "shape", "style_"]
    };
  },
  props: {
    color: String,
    style_: String,
    shape: String,
    size: String,
    icon: String,
    fluid: {
      type: Boolean,
      default: false
    }
  }
};
</script>