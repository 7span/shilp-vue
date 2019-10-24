<template>
  <div class="field" :class="blockClasses">
    <label v-if="label!==null && label!==undefined">{{label==""?"&nbsp;":label}}</label>
    <div class="field__group" :class="fieldGroupClasses">
      <!-- BEFORE -->
      <div v-if="before || beforeIcon" class="field__before">
        <slot name="before"></slot>
        <template v-if="before">{{before}}</template>
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
        <template v-if="after">{{after}}</template>
        <template v-if="afterIcon">
          <!-- ICON -->
          <div class="field__icon">
            <s-icon :name="afterIcon" />
          </div>
        </template>
        <slot name="after"></slot>
      </div>
    </div>

    <!-- MESSAGES -->
    <small v-if="desc">{{desc}}</small>
    <small class="field__danger" v-if="errorMessage">{{errorMessage || errors[0]}}</small>
    <small class="field__success" v-if="successMessage">{{successMessage}}</small>
  </div>
</template>

<script>
export default {
  name: "s-field",
  inheritAttrs: false,
  mixins: [require("../mixins/component.js").default],

  props: {
    label: String,
    before: String,
    beforeIcon: String,
    afterIcon: String,
    after: String,
    type: String,
    desc: String,
    size: String,
    color: String,
    errorMessage: String,
    successMessage: String,
    loader: {
      type: Boolean,
      default: false
    },
    optional: {
      type: Boolean,
      default: false
    },
    hasValidation: {
      type: Boolean,
      default: false
    },
    passwordToggle:Object
  },

  data() {
    return {
      blockClass: "field",
      variantClassProps: ["color", "size"],
      booleanClassProps: ["optional"],
      isPasswordVisible: false
    };
  },

  computed: {
    addBlockClasses() {
      const classes = [];
      if (this.errorMessage) classes.push("field--danger");
      if (this.successMessage) classes.push("field--success");
      return classes;
    },
    fieldGroupClasses() {
      const classes = [];
      if (this.loader) classes.push("loader", `loader--${this.loaderColor}`);
      if (this.loader && this.size) classes.push(`loader--${this.size}`);
      return classes;
    }
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