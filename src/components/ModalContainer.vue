<template>
  <portal-target
    class="modal-container"
    @change="handleUpdate"
    name="modal-container"
  ></portal-target>
</template>

<script>
export default {
  name: "s-modal-container",
  data() {
    return {
      open: false
    };
  },
  methods: {
    handleUpdate(newContent) {
      this.open = newContent;
    }
  }
};
</script>

<style lang="scss">
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>
