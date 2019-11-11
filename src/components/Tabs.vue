<template>
  <div class="tabs">
    <div class="tabs__list">
      <slot></slot>
    </div>
    <div class="tabs__content">
      <template v-for="slot in $slots.default">
        <div
          v-if="slot.componentOptions.propsData.name"
          v-show="slot.componentOptions.propsData.name == activeTab"
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

  props: {
    ...buttonProps,
    value: String,
    active: String
  },

  data() {
    return {
      localActive: null
    };
  },

  computed: {
    defaultActiveTab() {
      return this.$slots.default[0].componentOptions.propsData.name;
    },
    activeTab: {
      get() {
        if (this.active) {
          return this.localActive || this.active || this.defaultActiveTab;
        } else {
          return this.value || this.defaultActiveTab;
        }
      },
      set(tabName) {
        if (this.active) {
          this.localActive = tabName;
        } else {
          this.$emit("input", tabName);
        }
      }
    }
  },

  methods: {
    change(name) {
      this.activeTab = name;
    }
  }
};
</script>