<template>
  <div class="media" :class="blockClasses" :style="inlineCss">
    <slot>
      <img v-if="preview" :src="preview" />
      <img v-else-if="value && value.url" :src="value.url" alt="" />
    </slot>

    <!-- REMOVE BUTTONS -->
    <s-button
      v-if="value && !readonly"
      style_="muted"
      class="media__remove"
      @click.native="remove"
      color="danger"
      size="sm"
      icon="Close"
      shape="circle"
    ></s-button>

    <!-- SELECT -->
    <div v-if="!value && !$scopedSlots.default" class="media__select">
      <s-icon name="ImagePlus"></s-icon>
      <input type="file" :accept="accept" @change="select($event)" />
    </div>
  </div>
</template>

<script>
export default {
  name: "s-media",
  mixins: [require("../mixins/component.js").default],

  props: {
    fit: String,
    position: String,
    ratio: String,
    value: [Object, File],
    readonly: {
      type: Boolean,
      default: true
    },
    accept: {
      type: String,
      default: "*"
    },
    maxFileSize: {
      type: Number,
      default: 2 * 1024 * 1024 //2 MB
    }
  },

  data() {
    return {
      preview: null,
      fileObject: null,
      meta: null,
      blockClass: "media",
      booleanClassProps: []
    };
  },

  computed: {
    isUploaded() {
      if (!this.value) return false;
      return !(this.value instanceof File);
    },

    addBlockClasses() {
      const classes = [];
      if (this.ratio) {
        classes.push("ratio", `ratio--${this.ratio}`);
      }
      return classes;
    },

    inlineCss() {
      const css = {};
      if (this.fit) css["--media--fit"] = this.fit;
      if (this.position) css["--media--position"] = this.position;
      return css;
    }
  },

  methods: {
    select(e) {
      let file = e.target.files[0];
      if (file.size > this.maxFileSize) {
        alert(
          "File size is larger than " +
            this.maxFileSize / 1024 / 1024 +
            "MB. Please select a smaller file."
        );
        return;
      }
      this.$emit("input", file);
      let meta = {
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + "MB",
        type: file.type
      };
      this.fileObject = file;
      this.meta = meta;

      this.renderPreview();
    },

    remove() {
      this.$emit("remove");
      this.$emit("input", null);
      this.preview = this.meta = this.fileObject = null;
    },

    renderPreview() {
      var reader = new FileReader();
      reader.onload = e => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(this.fileObject);
    }
  }
};
</script>

<style lang="scss" scoped>
.media {
  position: relative;
}
.media__select {
  @include position(absolute, 0, 0, 0, 0);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: --color(grey, light);
  cursor: pointer;
  &:hover {
    color: --color(primary);
  }
  input {
    @include position(absolute, 0, 0, 0, 0);
    width: 100%;
    opacity: 0;
    font-size: 0;
    cursor: pointer;
  }
}
.media__remove {
  @include position(absolute, 8px, 8px, auto, auto);
}
</style>
