<template>
  <component v-if="name" :is="name" />
</template>

<script>
export default {
  name: "s-icon",
  props: {
    name: String
  }
};
</script>