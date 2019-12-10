<template>
  <div class="layout" :class="classes" :style="styles">
    <div class="layout__top" :class="childClasses" v-if="$scopedSlots.top">
      <slot name="top"></slot>
    </div>
    <div class="layout__left" :class="childClasses" v-if="$scopedSlots.left">
      <slot name="left"></slot>
    </div>
    <div class="layout__content" :class="childClasses">
      <slot></slot>
    </div>
    <div
      class="layout__bottom"
      :class="childClasses"
      v-if="$scopedSlots.bottom"
    >
      <slot name="bottom"></slot>
    </div>
    <div class="layout__right" :class="childClasses" v-if="$scopedSlots.right">
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
    gap: String,
    childRadius: String
  },
  watch: {
    $scopedSlots(nv) {
      console.log(nv);
    }
  },
  computed: {
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
      if (this.fullHeight) classes.push("h--100");
      return classes;
    },
    childClasses() {
      const classes = [];
      if (this.childRadius) classes.push(`radius--${this.childRadius}`);
      return classes;
    },
    styles() {
      const styles = {};
      if (this.gap) styles["gap"] = `var(--space--${this.gap})`;
      return styles;
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-template-rows: minmax(0, max-content) auto minmax(0, max-content);
  grid-template-columns: minmax(0, max-content) auto minmax(0, max-content);

  &.h--100 {
    .layout__content,
    .layout__left,
    .layout__right {
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
    .layout__content {
      grid-row-start: 2;
    }
    &#{$this}--right {
      .layout__right {
        grid-row-start: 2;
      }
    }
    &#{$this}--left {
      .layout__left {
        grid-row-start: 2;
      }
    }
    &#{$this}--push-top {
      .layout__left {
        grid-row-start: 1;
      }
      .layout__top {
        grid-column-start: 2;
      }
    }
    &#{$this}--pull-top {
      .layout__right {
        grid-row-start: 1;
      }
      .layout__top {
        grid-column-end: 3;
      }
    }
  }
  &--bottom {
    .layout__content {
      grid-row-end: 3;
    }
    &#{$this}--right {
      .layout__right {
        grid-row-end: 3;
      }
    }
    &#{$this}--left {
      .layout__left {
        grid-row-end: 3;
      }
    }
    &#{$this}--push-bottom {
      .layout__left {
        grid-row-end: 4;
      }
      .layout__bottom {
        grid-column-start: 2;
      }
    }
    &#{$this}--pull-bottom {
      .layout__right {
        grid-row-end: 4;
      }
      .layout__bottom {
        grid-column-end: 3;
      }
    }
  }
  &--left {
    .layout__content {
      grid-column-start: 2;
    }
  }
  &--right {
    .layout__content {
      grid-column-end: 3;
    }
  }
}
</style>
