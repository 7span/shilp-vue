<template>
  <div
    :class="{
      select: custom,
      'field-block': custom,
      'native-select': !custom,
      'loader loader--dark': loader
    }"
  >
    <select v-bind="$attrs" :class="{ 'field-block': !custom }" :value="value" @input="input">
      <option value>{{ placeholder }}</option>
      <option
        v-for="option in serializedOptions"
        :value="option.value"
        :key="uniqueId + '--' + option.value"
        :selected="value == option.value"
      >{{ option.label }}</option>
      <slot></slot>
    </select>
  </div>
</template>

<script>
import { uid } from "../utils";

export default {
  name: "s-select",
  inject: ["requestHandler"],
  inheritAttrs: false,

  props: {
    options: {
      type: Array,
      default: () => []
    },
    value: [String, Number],
    placeholder: {
      type: String,
      default: "Select"
    },
    custom: {
      type: Boolean,
      default: true
    },
    deselect: {
      type: Boolean,
      default: false
    },
    request: {
      type: [Function, Object],
      default: null
    }
  },

  data() {
    return {
      loader: false,
      optionsFromRequest: []
    };
  },

  created() {
    this.refresh();
  },

  computed: {
    uniqueId() {
      return uid();
    },
    serializedOptions() {
      const options = this.request ? this.optionsFromRequest : this.options;
      return options.map(item => {
        if (typeof item !== "object") {
          return {
            label: item,
            value: item
          };
        }
        return item;
      });
    }
  },

  methods: {
    input(e) {
      let options = this.request ? this.optionsFromRequest : this.options;
      let metaValue = options.find(item => item.value == e.target.value);
      this.$emit("input", e.target.value, metaValue);
    },
    getOptions() {
      this.loader = true;

      //Handle request in plugin initialization
      if (typeof this.request === "object") {
        this.requestHandler(this.request, this.$attrs)
          .then(res => {
            this.loader = false;
            this.optionsFromRequest = res;
          })
          .catch(() => {
            this.loader = false;
          });
      }

      //Handle request from function provided in props
      if (typeof this.request === "function") {
        this.request()
          .then(res => {
            this.loader = false;
            this.optionsFromRequest = res;
          })
          .catch(() => {
            this.loader = false;
          });
      }
    },
    refresh() {
      if (this.request) this.getOptions();
    }
  }
};
</script>

<style lang="scss" scoped>
.native-select {
  flex: 1 1 auto;
}
</style>
