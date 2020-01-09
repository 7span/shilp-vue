<template>
  <component
    class="icon"
    v-if="name"
    :is="name"
    :size="size"
    :fillColor="color"
    :title="title"
  />
</template>

<script>
export default {
  name: "s-icon",
  props: {
    name: String,
    title: String,
    size: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: "currentColor"
    }
  }
};
</script>
