<template>
  <div class="file field-block">
    <input type="text" :placeholder="placeholder" v-model="fileName" readonly />
    <input type="file" v-bind="attrGroup.file" @change="input" />
    <s-button v-bind="attrGroup.button" :size="parentProps.size">{{buttonLabel}}</s-button>
  </div>
</template>

<script>
export default {
  name: "s-file",
  inheritAttrs: false,
  props: {
    placeholder: String,
    buttonLabel: {
      type: String,
      default: "Select"
    },
    value: [FileList]
  },
  data() {
    return {
      fileName: null,
      buttonProps: ["color", "shape", "size", "style_", "align", "icon"]
    };
  },
  computed: {
    //Parent Propos will be passed down to all the child nav items
    //To avoid declaration of props on each child items.
    parentProps() {
      return this.$parent.$props;
    },

    attrGroup() {
      const file = {};
      const button = {};
      for (var key in this.$attrs) {
        if (this.buttonProps.includes(key)) {
          button[key] = this.$attrs[key];
        } else {
          file[key] = this.$attrs[key];
        }
      }
      return { file, button };
    }
  },
  methods: {
    input(e) {
      const files = e.target.files;
      let fileName = null;
      Array.from(files).forEach(item => {
        if (fileName) {
          fileName += ", " + item.name;
        } else {
          fileName = item.name;
        }
      });
      this.fileName = fileName;
      this.$emit("input", files);
    }
  }
};
</script>