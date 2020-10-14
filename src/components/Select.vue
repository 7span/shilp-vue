<template>
  <div
    :class="{
      select: custom,
      'field-block': custom,
      'native-select': !custom,
      'loader loader--dark': loader,
    }"
  >
    <select
      v-bind="$attrs"
      :class="{ 'field-block': !custom }"
      :value="value"
      @input="input"
    >
      <option value>{{ placeholder }}</option>
      <option
        v-for="(option, index) in serializedOptions"
        :value="option.value"
        :key="`option-${option.value}-${index}`"
        :selected="value == option.value"
        :disabled="option.disabled"
        >{{ option.label }}</option
      >
      <slot></slot>
    </select>
  </div>
</template>

<script>
import { uid } from "../utils";

export default {
  name: "s-select",
  inheritAttrs: false,
  inject: ["REQUEST"],
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: [String, Number],
    placeholder: {
      type: String,
      default: "Select",
    },
    custom: {
      type: Boolean,
      default: true,
    },
    deselect: {
      type: Boolean,
      default: false,
    },
    request: {
      type: [Function, Object],
      default: null,
    },
  },

  data() {
    return {
      loader: false,
      optionsFromRequest: [],
    };
  },

  created() {
    this.refresh();
  },

  computed: {
    serializedOptions() {
      const options = this.request ? this.optionsFromRequest : this.options;
      return options.map((item) => {
        if (typeof item !== "object") {
          return {
            label: item,
            value: item,
          };
        }
        return item;
      });
    },
  },

  methods: {
    uniqueId() {
      return uid();
    },
    input(e) {
      let options = this.request ? this.optionsFromRequest : this.options;
      let metaValue = options.find((item) => item.value == e.target.value);
      //Finding value from metaValue here
      //to keep null and undefined values as it is.
      //the null values are replaced with blank string if taken from e.target.value
      const value = metaValue && metaValue.value;
      this.$emit("input", value, metaValue);
    },
    getOptions() {
      this.loader = true;
      let request;
      //Handle request from function provided in props
      if (typeof this.request === "function") {
        request = this.request();
      }
      //Else use global requst resolver
      else {
        request = this.REQUEST({
          name: this.$attrs.name,
          method: "get",
          endpoint: this.request.url,
          params: this.request.params,
        });
      }
      request
        .then((res) => {
          this.loader = false;
          this.optionsFromRequest = res;
        })
        .catch(() => {
          this.loader = false;
        });
    },
    refresh() {
      if (this.request) this.getOptions();
    },
  },
};
</script>

<style lang="scss">
.native-select {
  flex: 1 1 auto;
}
</style>
