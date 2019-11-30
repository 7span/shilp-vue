<template>
  <portal-target
    v-show="open"
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
