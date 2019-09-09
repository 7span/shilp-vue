<template>
  <div class="buttons" :class="{'buttons--stacked':stacked}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "s-buttons",
  props: {
    stacked: {
      type: Boolean,
      default: false
    }
  }
};
</script>