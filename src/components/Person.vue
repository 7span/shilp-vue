<template>
  <component :is="tag" v-bind="link" class="person" :class="blockClasses">
    <slot name="avatar">
      <s-avatar name="John Cena"></s-avatar>
    </slot>
    <p class="person__name">
      <slot name="name">{{name}}</slot>
    </p>
    <small class="person__message">
      <slot name="message">{{message}}</slot>
    </small>
  </component>
</template>

<script>
export default {
  name: "s-person",
  inheritAttrs: false,
  mixins: [require("../mixins/component.js").default],

  props: {
    name: {
      type: String,
      default: "John Cena"
    },
    message: {
      type: String,
      default: "You can't see me!"
    },
    to: {
      type: String
    }
  },

  data() {
    return {
      blockClass: "person",
      booleanClassProps: [""],
      variantClassProps: [""]
    };
  },

  computed: {
    isExternalLink() {
      if (this.to && this.to.startsWith("http")) return true;
      return false;
    },
    link() {
      if (!this.to) return;
      if (this.isExternalLink) {
        return { href: this.to };
      } else {
        return { to: this.to };
      }
    },
    tag() {
      if (this.to) {
        if (this.isExternalLink) {
          return "a";
        }
        return "router-link";
      }
      return "div";
    }
  }
};
</script>
