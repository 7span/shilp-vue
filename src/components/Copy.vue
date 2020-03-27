<template>
  <input type="text" id="shilp-copy" :value="value" />
</template>
<script>
export default {
  data() {
    return {
      value: null
    };
  },
  created() {
    this.$root.$on("shilp-copy", data => {
      this.value = data;
      this.$nextTick(() => {
        const target = document.getElementById("shilp-copy");
        target.select(); /* Select the text field */
        target.setSelectionRange(0, 99999); /*For mobile devices*/
        document.execCommand("copy");
        this.value = null;
      });
    });
  }
};
</script>

<style lang="scss" scoped>
#shilp-copy {
  position: fixed;
  top: 0;
  left: 0;
  height: 0px;
  padding: 0;
  border: none;
  opacity: 0;
  z-index: -1;
}
</style>
