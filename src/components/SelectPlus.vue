<template>
  <div class="select field-block" :class="{'loader overlay overlay--light':loader}">
    <select :value="value" @change="input">
      <option value :disabled="!deselect" :selected="!value">{{placeholder}}</option>
      <option v-for="option in options" :value="option.value">{{option.label}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "s-select-plus",
  inject: ["AXIOS"],
  props: {
    value: [String, Number],
    url: String,
    params: {
      type: Object,
      default: () => {}
    },
    placeholder: {
      type: String,
      default: "Select"
    },
    deselect: {
      type: Boolean,
      default: false
    },
    responseHook: {
      type: Function,
      default(res) {
        return res.data;
      }
    }
  },

  data() {
    return {
      loader: false,
      options: []
    };
  },

  created() {
    this.loader = true;
    this.AXIOS.get(this.url, {
      params: this.params
    })
      .then(res => {
        this.loader = false;
        this.options = this.responseHook(res);
      })
      .catch(err => {
        this.loader = false;
        console.error(err);
      });
  },

  methods: {
    input(e) {
      let metaValue = this.options.find(item => item.value == e.target.value);
      this.$emit("input", e.target.value, metaValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.native-select {
  flex: 1 1 auto;
}
</style>