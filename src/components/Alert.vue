<template>
  <div class="alert" :class="blockClassList">
    <s-icon v-if="icon" class="alert__icon" :name="icon"></s-icon>
    <p class="alert__body">
      <slot></slot>
    </p>
  </div>
</template>

<script>
import component from "../mixins/component";
export default {
  name: "s-alert",
  shilp: {
    block: "alert",
    boolean: ["fluid"],
    string: ["color", "size", "shape", "theme"]
  },
  mixins: [component],
  props: {
    color: String,
    theme: String,
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
