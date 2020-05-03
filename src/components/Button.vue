<!--
NOTE:
This component requires vue-router version to be 3.1.0+
-->
<template>
  <!-- ROUTER LINK -->
  <router-link
    v-if="to && !isDisabled"
    :to="to"
    v-slot="{ href, isActive, isExactActive, navigate }"
  >
    <a
      :href="href"
      @click="navigate"
      class="button"
      :class="[
        ...routerLinkClassList({ isActive, isExactActive }),
        ...blockClassList
      ]"
    >
      <slot name="before"></slot>
      <slot name="icon">
        <s-icon title v-if="icon" class="button__icon" :name="icon" />
        <span v-else-if="emoji" class="button__icon button__emoji">{{
          emoji
        }}</span>
      </slot>

      <span v-if="label || $scopedSlots.default" class="button__label">
        <template v-if="label">{{ label }}</template>
        <slot v-else></slot>
      </span>
      <slot name="after"></slot>
    </a>
  </router-link>

  <!-- BUTTON -->
  <component
    v-else
    :is="component"
    class="button"
    :type="type"
    :class="blockClassList"
    v-bind="$attrs"
  >
    <slot name="before"></slot>

    <slot name="icon">
      <s-icon title v-if="icon" class="button__icon" :name="icon" />
      <span v-else-if="emoji" class="button__icon button__emoji">{{
        emoji
      }}</span>
    </slot>

    <span v-if="label || $scopedSlots.default" class="button__label">
      <template v-if="label">{{ label }}</template>
      <slot v-else></slot>
    </span>

    <slot name="after"></slot>
  </component>
</template>

<script>
import buttonProps from "../props/button.js";
import { cloneDeep } from "lodash-es";
import component from "../mixins/component.js";
import childComponent from "../mixins/childComponent";

export default {
  name: "s-button",
  shilp: {
    block: "button",
    boolean: ["fluid", "active", "badge", "wrap"],
    variant: ["color", "size", "shape", "theme", "align"],
    inheritPropsFrom: "s-button-group"
  },
  mixins: [component, childComponent],
  props: cloneDeep(buttonProps),
  computed: {
    isDisabled() {
      return (
        this.$attrs.disabled &&
        (this.$attrs.disabled == "disabled" || this.$attrs.disabled === true)
      );
    },

    component() {
      if (this.badge || this.$attrs.for) {
        return "label";
      } else if (this.$attrs.href && !this.isDisabled) {
        return "a";
      }
      return "button";
    },

    classList() {
      const classes = [];
      if (this.loader) classes.push("loader", `loader--${this.loaderColor}`);
      if (this.loader && this.size) classes.push(`loader--${this.size}`);
      return classes;
    }
  },

  methods: {
    routerLinkClassList(scope) {
      const { isActive, isExactActive } = scope;
      const classes = [];
      if (isActive) {
        classes.push("button--active");
        this.$emit("active", true);
      } else {
        this.$emit("active", false);
      }
      if (isExactActive) {
        classes.push("button--exact-active");
        this.$emit("exact-active", true);
      } else {
        this.$emit("exact-active", false);
      }

      return classes;
    }
  }
};
</script>
