<template>
  <li
    class="nav__item"
    :class="{
      'nav__item--active': active,
      'nav__item--exact-active': exactActive
    }"
  >
    <label v-if="type == 'label'" class="nav__label">
      <slot />
    </label>
    <s-button
      v-else
      class="nav__link"
      @active="active = $event"
      @exact-active="exactActive = $event"
      v-bind="{ ...$attrs, ...propsWithParent }"
    >
      <slot></slot>
    </s-button>
    <slot name="nav"></slot>
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
  },
  computed: {
    test() {
      return "HelloHi";
    },
    isActive() {
      if (this.$attrs.to) {
        const currentRoute = this.$route.fullPath;
        const resolvedPath = this.$router.resolve(this.$attrs.to).route
          .fullPath;
        return currentRoute === resolvedPath;
      }
      return false;
    }
  }
};
</script>
