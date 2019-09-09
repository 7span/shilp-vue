<template>
  <input class="field-block" :value="value" @input="$emit('input',$event.target.value)" />
</template>

<script>
export default {
  name: "s-textbox",

  props: {
    value: [String, Number]
  }
};
</script>