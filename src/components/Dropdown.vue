<template>
  <v-popover
    class="dropdown"
    :class="{ 'field-block dropdown--select': select }"
    v-bind="popoverProps"
  >
    <!-- TRIGGER -->
    <template v-if="select">
      <div class="select">
        <slot name="trigger">{{ placeholder }}</slot>
      </div>
    </template>
    <template v-else>
      <slot name="trigger">{{ placeholder }}</slot>
    </template>

    <!-- CONTENT -->
    <template slot="popover">
      <!-- OPTIONS -->
      <template v-if="options">
        <s-buttons class="dropdown__options" stack group>
          <s-button
            v-close-popover
            :align="align"
            v-for="(option, index) in options"
            :key="`option--${index}`"
            >{{ option.label }}</s-button
          >
        </s-buttons>
      </template>

      <!-- SLOT -->
      <slot></slot>
    </template>
  </v-popover>
</template>

<script>
export default {
  name: "s-dropdown",
  inheritAttrs: false,

  props: {
    value: [String, Number],
    container: String,
    popoverOptions: Object,
    placeholder: {
      type: String,
      default: "Select"
    },
    select: {
      type: Boolean,
      default: false
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
      let options = {};
      let defaultClasses = [];
      if (this.select) {
        defaultClasses.push("select-popover");
      } else {
        defaultClasses.push("dropdown-popover");
      }

      //If popoverClass is defined, merge the default class
      // Or add the class
      if (this.popoverOptions) {
        options.popoverClass = [
          ...(this.popoverOptions.popoverClass || []),
          ...defaultClasses
        ];
      } else {
        options.popoverClass = defaultClasses;
      }

      if (this.align) {
        if (this.align == "left") options.placement = "bottom-start";
        if (this.align == "right") options.placement = "bottom-end";
      }

      if (this.container) {
        options.container = this.container;
        options.boundariesElement = document.querySelector(this.container);
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
  padding-right: 0;
  .field {
    margin-bottom: 0;
  }
  .trigger {
    display: flex !important;
    cursor: pointer;
    width: 100%;
    height: 100%;
    .select {
      padding: 0 32px 0 0;
      line-height: initial;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }
}

.dropdown__options {
  button {
    &:hover {
      background-color: --color(grey, lightest);
    }
  }
}
.tooltip.popover.dropdown-popover {
  border: 1px solid --color(grey, light);
  border-radius: --radius(3);
  box-shadow: --shadow(4);

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

.tooltip.popover.select-popover {
  border: 1px solid --color(grey, light);
  border-radius: 4px;
  background-color: #fff;
  margin: 4px 11px 4px -11px;
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
</style>
