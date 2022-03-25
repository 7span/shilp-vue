<template>
  <div>
    <s-field-validate v-bind="$attrs"
      ><s-textbox v-model="name" v-bind="$attrs"></s-textbox
    ></s-field-validate>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  created() {},
};
</script>

<style></style>
