<template>
  <validation-observer v-slot="props">
    <s-form @submit="$emit('submit')" v-bind="$attrs">
      <!-- Passdown All The Slots for Form -->
      <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="{...props,...scope}" />
      </template>
    </s-form>
  </validation-observer>
</template>

<script>
export default {
  name: "s-form-validate",
  inheritAttrs: false,

  props: {}
};
</script>