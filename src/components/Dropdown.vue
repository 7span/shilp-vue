<template>
  <v-popover class="dropdown" v-bind="popoverProps">
    <!-- TRIGGER -->
    <slot name="trigger">
      <s-field v-bind="$attrs">
        <div class="select field-block">{{placeholder}}</div>
      </s-field>
    </slot>

    <!-- CONTENT -->
    <template slot="popover">
      <!-- OPTIONS -->
      <template v-if="options">
        <s-buttons class="dropdown__options" stack group>
          <s-button v-close-popover :align="align" v-for="option in options">{{option.label}}</s-button>
        </s-buttons>
      </template>
      <!-- SLOT -->
      <slot v-else></slot>
    </template>
  </v-popover>
</template>

<script>
export default {
  name: "s-dropdown",
  inheritAttrs: false,

  props: {
    value: [String, Number],
    popoverOptions: Object,
    placeholder: {
      type: String,
      default: "Select"
    },
    align: {
      type: String,
      default: "left"
    },
    options: Array
  },

  data() {
    return {};
  },
  computed: {
    popoverProps() {
      return {
        ...this.defaultPopoverProps,
        ...this.popoverOptions,
        ...this.fixedPopoverProps
      };
    },
    defaultPopoverProps() {
      return {
        offset: 0,
        placement: "bottom-start"
      };
    },
    fixedPopoverProps() {
      let options = {
        popoverClass: ["dropdown-popover"]
      };
      if (this.align) {
        if (this.align == "left") options.placement = "bottom-start";
        if (this.align == "right") options.placement = "bottom-end";
      }
      return options;
    }
  },

  methods: {
    input(e) {
      let metaValue = this.options.find(item => item.value == e.target.value);
      this.$emit("input", e.target.value, metaValue);
    }
  }
};
</script>

<style lang="scss">
.dropdown {
  .trigger {
    cursor: pointer;
  }
  .select {
    padding: 0px 32px 0 --space(sm);
  }
  .field {
    margin-bottom: 0;
  }
}

.tooltip.popover.dropdown-popover {
  border: 1px solid --color(grey, light);
  border-radius: --border-radius(sm);
  background-color: #fff;
  box-shadow: --box-shadow(xl);
  .popover-inner {
    background: transparent;
    border-radius: 0;
    padding: 0;
    box-shadow: none;
  }
  .popover-arrow {
    display: none !important;
  }
}

.dropdown__options {
  button {
    &:hover {
      background-color: --color(grey, lightest);
    }
  }
}
</style>