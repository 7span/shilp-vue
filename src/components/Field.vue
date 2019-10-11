<template>
  <div class="field" :class="blockClasses">
    <label v-if="label!==null && label!==undefined">{{label==""?"&nbsp;":label}}</label>
    <slot name="before"></slot>
    <div class="field__group">
      <div v-if="before || beforeIcon" class="field__before">
        <template v-if="before">{{before}}</template>
        <div class="field__icon" v-if="beforeIcon">
          <s-icon :name="beforeIcon" />
        </div>
      </div>

      <slot></slot>

      <div v-if="after || afterIcon" class="field__after">
        <template v-if="after">{{after}}</template>
        <div class="field__icon" v-if="afterIcon">
          <s-icon :name="afterIcon" />
        </div>
      </div>
    </div>
    <small v-if="desc">{{desc}}</small>
    <small class="field__danger" v-if="errorMessage">{{errorMessage || errors[0]}}</small>
    <small class="field__success" v-if="successMessage">{{successMessage}}</small>
    <slot name="after"></slot>
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
    }
  },

  data() {
    return {
      blockClass: "field",
      variantClassProps: ["color", "size"],
      booleanClassProps:["optional"]
    };
  },

  computed: {
    addBlockClasses() {
      const classes = [];
      if (this.errorMessage) classes.push("field--danger");
      if (this.successMessage) classes.push("field--success");
      if (this.loader) classes.push("loader", `loader--${this.loaderColor}`);
      if (this.loader && this.size) classes.push(`loader--${this.size}`);
      return classes;
    }
  }
};
</script>