<template>
  <div class="field" :class="blockClassList">
    <label class="field__label" v-if="label !== null && label !== undefined">
      {{ label == "" ? "&nbsp;" : label }}
    </label>
    <div class="field__group">
      <!-- BEFORE -->
      <slot name="before"></slot>
      <div v-if="before || beforeIcon" class="field__before">
        <template v-if="before">{{ before }}</template>
        <div class="field__icon" v-if="beforeIcon">
          <s-icon :name="beforeIcon" />
        </div>
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
      <div v-if="after || afterIcon" class="field__after">
        <template v-if="after">{{ after }}</template>
        <template v-if="afterIcon">
          <!-- ICON -->
          <div class="field__icon">
            <s-icon :name="afterIcon" />
          </div>
        </template>
      </div>
      <slot name="after"></slot>
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
  </div>
</template>

<script>
import component from "../mixins/component";
export default {
  name: "s-field",
  shilp: {
    block: "field",
    variant: ["color", "size", "theme"],
    boolean: ["optional"]
  },
  inheritAttrs: false,
  mixins: [component],

  props: {
    label: String,
    desc: String,
    before: String,
    beforeIcon: String,
    after: String,
    afterIcon: String,
    size: String,
    color: String,
    theme: String,
    message: [String, Boolean],
    loader: {
      type: Boolean,
      default: false
    },
    optional: {
      type: Boolean,
      default: false
    },
    passwordToggle: Object
  },

  data() {
    return {
      isPasswordVisible: false
    };
  },

  computed: {
    classList() {
      const classes = [];
      return classes;
    }
    // fieldGroupClasses() {
    //   const classes = [];
    //   if (this.loader) classes.push("loader", `loader--${this.loaderColor}`);
    //   if (this.loader && this.size) classes.push(`loader--${this.size}`);
    //   return classes;
    // }
  }
};
</script>

<style lang="scss" scoped>
.field__password-toggle {
  width: var(--field--size);
  height: var(--field--size);
  background-color: transparent;
  border: var(--field--border-width) solid var(--field--border-color);
  border-left: none;
  color: var(--field--circum-color);
  cursor: pointer;
}
</style>
