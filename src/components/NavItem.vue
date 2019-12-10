<template>
  <li class="nav__item" :class="{'nav__item--active':isActive}">
    <label v-if="type == 'label'" class="nav__label">
      <slot />
    </label>
    <s-button v-else class="nav__link" v-bind="mergedProps">
      <slot />
    </s-button>
    <slot name="nav"></slot>
  </li>
</template>

<script>
import props from "../props/button.js";

export default {
  name: "s-nav-item",
  inheritAttrs: false,

  props: {
    label: String,
    type: {
      type: String,
      default: "button"
    },
    ...props
  },
  computed: {
    //Parent Propos will be passed down to all the child nav items
    //To avoid declaration of props on each child items.
    parentProps() {
      return this.$parent.$props;
    },
    isActive() {
      if (this.$attrs.to) {
        const currentRoute = this.$route.fullPath;
        const resolvedPath = this.$router.resolve(this.$attrs.to).route
          .fullPath;
        return currentRoute === resolvedPath;
      }
      return false;
    },

    mergedProps() {
      const props = {};
      for (var key in this.$props) {
        if (this.$props[key]) {
          props[key] = this.$props[key];
        } else if (this.parentProps[key]) {
          props[key] = this.parentProps[key];
        }
      }
      Object.assign(props, this.$attrs);
      return props;
    }
  }
};
</script>
