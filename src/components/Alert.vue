<template>
  <div class="alert" :class="classes">
    <s-icon v-if="icon" class="alert__icon" :name="icon"></s-icon>
    <p class="alert__body">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "s-alert",

  props: {
    color: String,
    style_: String,
    shape: String,
    size: String,
    icon: String,
    fluid: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes() {
      const classes = [];

      ["color", "size", "shape", "style_"].forEach(item => {
        if (this[item]) classes.push(`alert--${this[item]}`);
      });

      if (this.fluid) classes.push("alert--fluid");

      return classes;
    }
  }
};
</script>