<template>
  <div class="tabs">
    <div class="tabs__list">
      <slot></slot>
    </div>
    <template v-for="(tab,index) in $slots.default">
      <component :is="tab" :key="`tab--${index}`"></component>
    </template>
    <div class="tabs__content">
      <template v-for="slot in $slots.default">
        <div
          v-if="slot.componentOptions.propsData.name"
          v-show="slot.componentOptions.propsData.name == active"
          :key="`tab--${slot.componentOptions.propsData.name}`"
          class="tab-content"
          :class="`tab-content--${slot.componentOptions.propsData.name}`"
        >
          <slot :name="slot.componentOptions.propsData.name"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import buttonProps from "../props/button.js";

export default {
  name: "s-tabs",

  data() {
    return {
      tabs: []
    };
  },
  props: {
    ...buttonProps,
    value: String
  },

  computed: {
    active: {
      get() {
        return (
          this.value || this.$slots.default[0].componentOptions.propsData.name
        );
      }
    }
  }
};
</script>