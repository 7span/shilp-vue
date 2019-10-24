<template>
  <v-popover>
    <div class="select field-block" :class="{'loader overlay overlay--light':loader}">S>>elect</div>
    <div class="dropdown__content" slot="popover">
      <slot></slot>
    </div>
  </v-popover>
</template>

<script>
export default {
  name: "s-dropdown",
  props: {
    value: [String, Number],
    placeholder: {
      type: String,
      default: "Select"
    },
    deselect: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      loader: false,
      options: []
    };
  },

  methods: {
    input(e) {
      let metaValue = this.options.find(item => item.value == e.target.value);
      this.$emit("input", e.target.value, metaValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.native-select {
  flex: 1 1 auto;
}
</style>