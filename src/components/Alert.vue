<template>
  <div class="alert" :class="blockClassList" v-if="$scopedSlots.default">
    <s-icon v-if="icon" class="alert__icon" :name="icon"></s-icon>
    <p class="alert__title">{{ title }}</p>
    <div class="alert__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import component from "../mixins/component";
export default {
  name: "s-alert",
  shilp: {
    block: "alert",
    boolean: ["fluid"],
    variant: ["color", "size", "shape", "theme"]
  },
  mixins: [component],
  props: {
    title: String,
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
