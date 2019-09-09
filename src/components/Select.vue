<template>
  <div :class="{'select':custom, 'field-block':custom, 'native-select':!custom}">
    <select :class="{'field-block':!custom}" :value="value" @input="$emit('input',$event)">
      <option value :disabled="!deselect">{{placeholder}}</option>
      <option v-for="option in options" :value="option.value">{{option.label}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "s-select",

  props: {
    options: Array,
    value: [String, Number],
    placeholder: {
      type: String,
      default: "Select"
    },
    custom: {
      type: Boolean,
      default: true
    },
    deselect: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.native-select {
  flex: 1 1 auto;
}
</style>