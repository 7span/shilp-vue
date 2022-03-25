<template>
  <s-button class="ml-2 text-capitalize" v-bind="$attrs"></s-button>
</template>

<script>
import values from "./prop-values";
export default {
  data() {
    return {
      values,
    };
  },
};
</script>

<style></style>
