<template>
  <div class="field" :class="blockClassList">
    <label
      class="field__label"
      v-if="label !== false && label !== null && label !== undefined"
    >
      {{ label == "" ? "&nbsp;" : label }}
    </label>

    <slot name="start"></slot>

    <div class="field__content" :class="{ 'h-100': fullHeight }">
      <!-- BEFORE -->

      <div
        v-if="before || beforeIcon || $scopedSlots.before"
        class="field__before"
      >
        <template v-if="before">{{ before }}</template>
        <div class="field__icon" v-if="beforeIcon">
          <s-icon :name="beforeIcon" />
        </div>
        <slot name="before"></slot>
      </div>

      <slot></slot>

      <!-- PASSWORD TOGGLE -->
      <button
        v-if="passwordToggle"
        type="button"
        class="field__password-toggle"
        @click="isPasswordVisible = !isPasswordVisible"
        title="View Password"
      >
        <div class="field__icon">
          <s-icon v-if="isPasswordVisible" :name="passwordToggle.visibleIcon" />
          <s-icon v-if="!isPasswordVisible" :name="passwordToggle.hiddenIcon" />
        </div>
      </button>

      <!-- AFTER -->
      <div v-if="after || afterIcon || $scopedSlots.after" class="field__after">
        <template v-if="after">{{ after }}</template>
        <template v-else-if="afterIcon">
          <!-- ICON -->
          <div class="field__icon">
            <s-icon :name="afterIcon" />
          </div>
        </template>
        <slot name="after"></slot>
      </div>
    </div>

    <!-- MESSAGES -->
    <small class="field__desc" v-if="desc || $scopedSlots.desc">
      <slot name="desc">
        {{ desc }}
      </slot>
    </small>
    <small class="field__message" v-if="message || $scopedSlots.message">
      <slot name="message">
        {{ message }}
      </slot>
    </small>

    <slot name="end"></slot>
  </div>
</template>

<script>
import component from "../mixins/component";
export default {
  name: "s-field",
  shilp: {
    block: "field",
    variant: ["color", "size", "theme"],
    boolean: ["optional", "inline"],
  },
  mixins: [component],

  props: {
    label: [String, Boolean],
    desc: String,
    before: [String, Number],
    beforeIcon: String,
    after: [String, Number],
    afterIcon: String,
    size: String,
    color: String,
    theme: String,
    message: [String, Boolean],
    loader: {
      type: Boolean,
      default: false,
    },
    optional: {
      type: Boolean,
      default: false,
    },
    passwordToggle: Object,
    fullHeight: {
      type: Boolean,
      default: false,
    },
    inline: Boolean,
  },

  data() {
    return {
      isPasswordVisible: false,
    };
  },

  computed: {
    classList() {
      const classes = [];
      if (this.fullHeight) classes.push("h-100");
      return classes;
    },
    // fieldGroupClasses() {
    //   const classes = [];
    //   if (this.loader) classes.push("loader", `loader--${this.loaderColor}`);
    //   if (this.loader && this.size) classes.push(`loader--${this.size}`);
    //   return classes;
    // }
  },
};
</script>

<style lang="scss">
.field {
  .select-popover {
    right: 0;
  }
}
.field__password-toggle {
  flex: 0 0 auto;
  width: var(--field--size);
  height: var(--field--size);
  background-color: var(--field--circum-bg);
  border: var(--field--border-width) solid var(--field--border-color);
  border-left: none;
  color: var(--field--circum-color);
  cursor: pointer;
  padding: 0;
  justify-content: center;
  align-items: center;
  display: flex;
  outline: none !important;
}
</style>
