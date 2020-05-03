<template>
  <input type="text" id="shilp-copy" :value="value" />
</template>
<script>
export default {
  props: {
    shadowRoot: {
      type: ShadowRoot
    }
  },
  data() {
    return {
      value: null
    };
  },
  computed: {},
  created() {
    this.$root.$on("shilp-copy", data => {
      this.value = data;
      this.$nextTick(() => {
        let target;
        if (!this.shadowRoot) {
          target = document.getElementById("shilp-copy");
        } else {
          target = this.shadowRoot.getElementById("shilp-copy");
        }
        target.select(); /* Select the text field */
        target.setSelectionRange(0, 99999); /*For mobile devices*/
        document.execCommand("copy");
        this.value = null;
      });
    });
  }
};
</script>

<style lang="scss">
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
