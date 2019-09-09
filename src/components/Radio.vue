<template>
  <div class="options" :class="`gx--${gap}`">
    <div class="radio" v-for="option in options">
      <input
        :name="name"
        type="radio"
        :id="option.id"
        :value="option.value"
        :checked="option.selected"
      />
      <label :for="option.id">{{option.label}}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "s-radio",

  props: {
    options: Array,
    name: String,
    gap: {
      type: String,
      default: "md"
    }
  }
};
</script>