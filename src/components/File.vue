<template>
  <div
    class="file"
    :class="{ 'file--button': buttonOnly, 'field-block': !buttonOnly }"
  >
    <input type="file" v-bind="attrGroup.file" @change="input" />
    <input type="text" :placeholder="placeholder" v-model="fileName" readonly />
    <s-button v-bind="attrGroup.button" />
  </div>
</template>

<script>
export default {
  name: "s-file",
  inheritAttrs: false,
  props: {
    placeholder: String,
    value: [FileList],
    buttonOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileName: null,
      buttonProps: ["label", "color", "shape", "size", "theme", "align", "icon"]
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

      //Validate if the validation is provided.
      //Why emit from parent : https://github.com/vuejs/vue/issues/4332#issuecomment-263444492
      if (this.parentProps.hasValidation) {
        this.$parent.$emit("validate");
      }
    }
  }
};
</script>
