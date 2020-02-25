<template>
  <div class="layout" :class="classes()" :style="styles">
    <div
      class="layout__top"
      :class="[...topClasslist, ...childClasses]"
      v-if="$scopedSlots.top"
    >
      <slot name="top"></slot>
    </div>
    <div
      class="layout__left"
      :class="[...leftClasslist, ...childClasses]"
      v-if="$scopedSlots.left"
    >
      <slot name="left"></slot>
    </div>
    <div
      class="layout__content"
      :class="[...contentClasslist, ...childClasses]"
    >
      <slot></slot>
    </div>
    <div
      class="layout__bottom"
      :class="[...bottomClasslist, ...childClasses]"
      v-if="$scopedSlots.bottom"
    >
      <slot name="bottom"></slot>
    </div>
    <div
      class="layout__right"
      :class="[...rightClasslist, ...childClasses]"
      v-if="$scopedSlots.right"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "s-layout",
  props: {
    pushTop: Boolean,
    pushBottom: Boolean,
    pullTop: Boolean,
    pullBottom: Boolean,
    fullHeight: {
      type: Boolean,
      default: false
    },
    gap: Number,
    childClasslist: {
      type: Array,
      default: () => []
    },
    topClasslist: {
      type: Array,
      default: () => []
    },
    rightClasslist: {
      type: Array,
      default: () => []
    },
    bottomClasslist: {
      type: Array,
      default: () => []
    },
    leftClasslist: {
      type: Array,
      default: () => []
    },
    contentClasslist: {
      type: Array,
      default: () => []
    },
    leftSize: String,
    topSize: String,
    rightSize: String,
    bottomSize: String
  },

  computed: {
    childClasses() {
      return this.childClasslist;
    },
    styles() {
      const styles = {};
      if (this.gap) styles["gap"] = `var(--space--${this.gap})`;
      if (this.topSize) styles["--layout--top-size"] = this.topSize;
      if (this.rightSize) styles["--layout--right-size"] = this.rightSize;
      if (this.bottomSize) styles["--layout--bottom-size"] = this.bottomSize;
      if (this.leftSize) styles["--layout--left-size"] = this.leftSize;
      return styles;
    }
  },
  methods: {
    // Using method instead of computed propery here
    // because reactivity of $scopedSlots do not work
    // when values are cached in computed properties
    classes() {
      const classes = [];
      if (this.$scopedSlots.top) classes.push(`layout--top`);
      if (this.$scopedSlots.right) classes.push(`layout--right`);
      if (this.$scopedSlots.bottom) classes.push(`layout--bottom`);
      if (this.$scopedSlots.left) classes.push(`layout--left`);
      if (this.pushTop) classes.push(`layout--push-top`);
      if (this.pushBottom) classes.push(`layout--push-bottom`);
      if (this.pullTop) classes.push(`layout--pull-top`);
      if (this.pullBottom) classes.push(`layout--pull-bottom`);
      if (this.fullHeight) classes.push("h-100");
      return classes;
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-rows:
    var(--layout--top-size, minmax(0, max-content))
    auto var(--layout--bottom-size, minmax(0, max-content));
  grid-template-columns:
    var(--layout--left-size, minmax(0, max-content))
    auto var(--layout--right-size, minmax(0, max-content));

  &.h-100 {
    > .layout__content,
    > .layout__left,
    > .layout__right {
      overflow: auto;
    }
  }
}
.layout__content {
  grid-column: 1 / 4;
  grid-row: 1 / 4;
}
.layout__top {
  grid-column: 1 / 4;
  grid-row: 1 / 2;
}
.layout__bottom {
  grid-column: 1 / 4;
  grid-row: 3 / 4;
}
.layout__left {
  grid-column: 1 / 2;
  grid-row: 1 / 4;
}
.layout__right {
  grid-column: 3 / 4;
  grid-row: 1 / 4;
}

// ALL

.layout {
  $this: &;
  &--top {
    > .layout__content {
      grid-row-start: 2;
    }
    &#{$this}--right {
      > .layout__right {
        grid-row-start: 2;
      }
    }
    &#{$this}--left {
      > .layout__left {
        grid-row-start: 2;
      }
    }
    &#{$this}--push-top {
      > .layout__left {
        grid-row-start: 1;
      }
      > .layout__top {
        grid-column-start: 2;
      }
    }
    &#{$this}--pull-top {
      > .layout__right {
        grid-row-start: 1;
      }
      > .layout__top {
        grid-column-end: 3;
      }
    }
  }
  &--bottom {
    > .layout__content {
      grid-row-end: 3;
    }
    &#{$this}--right {
      > .layout__right {
        grid-row-end: 3;
      }
    }
    &#{$this}--left {
      > .layout__left {
        grid-row-end: 3;
      }
    }
    &#{$this}--push-bottom {
      > .layout__left {
        grid-row-end: 4;
      }
      > .layout__bottom {
        grid-column-start: 2;
      }
    }
    &#{$this}--pull-bottom {
      > .layout__right {
        grid-row-end: 4;
      }
      > .layout__bottom {
        grid-column-end: 3;
      }
    }
  }
  &--left {
    > .layout__content {
      grid-column-start: 2;
    }
  }
  &--right {
    > .layout__content {
      grid-column-end: 3;
    }
  }
}
</style>
