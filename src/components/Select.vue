<template>
  <div
    :class="{'select':custom, 'field-block':custom, 'native-select':!custom, 'loader loader--dark':loader}"
  >
    <select v-bind="$attrs" :class="{'field-block':!custom, }" :value="value" @input="input">
      <option value :disabled="!deselect">{{placeholder}}</option>
      <option
        v-for="option in (request ? optionsFromRequest : options)"
        :value="option.value"
        :key="option.value"
        :selected="value==option.value"
      >{{option.label}}</option>
      <slot></slot>
    </select>
  </div>
</template>

<script>
export default {
  name: "s-select",
  inject: ["requestHandler"],
  inheritAttrs: false,

  props: {
    options: Array,
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
      optionsFromRequest: null
    };
  },

  created() {
    this.refresh();
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
          .catch(err => {
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
          .catch(err => {
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