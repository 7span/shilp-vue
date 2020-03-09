<template>
  <li
    class="nav__item"
    :class="{
      'nav__item--active': active,
      'nav__item--exact-active': exactActive
    }"
  >
    <template v-if="type == 'group'">
      <slot name="label" />
      <slot></slot>
    </template>

    <template v-else>
      <s-button
        class="nav__link"
        @active="active = $event"
        @exact-active="exactActive = $event"
        v-bind="{ ...$attrs, ...propsWithParent }"
      >
        <slot></slot>
      </s-button>
    </template>
  </li>
</template>

<script>
import childComponent from "../mixins/childComponent.js";

export default {
  name: "s-nav-item",
  inheritAttrs: false,
  mixins: [childComponent],
  props: {
    label: String,
    type: {
      type: String,
      default: "button"
    }
  },
  data() {
    return {
      active: null,
      exactActive: null
    };
  },
  created() {
    if (this.parentComponent != "s-nav") {
      console.warn(
        "SHILP-VUE: The <s-nav-item> should be used as a child of <s-nav>"
      );
    }
  }
};
</script>
