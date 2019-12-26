<template>
  <div class="media" :class="blockClasses" :style="inlineCss">
    <!-- BASE64 PREVIEW -->
    <img v-if="preview" :src="preview" />

    <!-- URL -->
    <template v-else-if="value && value.url">
      <div v-if="waitToLoad && mediaLoading" class="media__loading" v-shilp-loader="true"></div>
      <img v-else :src="value.url" alt />
    </template>

    <!-- SELECT -->
    <div v-else-if="!readonly" class="media__select">
      <s-icon name="ImagePlus"></s-icon>
      <input type="file" :accept="accept" @change="select($event)" />
    </div>

    <!-- FALLBACK -->
    <div v-else class="media__placeholder">
      <s-icon name="ImageIcon"></s-icon>
    </div>

    <!-- REMOVE BUTTON -->
    <div class="media__remove" v-if="value && !readonly">
      <slot name="remove">
        <s-button
          style_="muted"
          @click.native="remove"
          color="danger"
          size="sm"
          icon="Close"
          shape="circle"
        ></s-button>
      </slot>
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
    },
    waitToLoad: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      preview: null,
      fileObject: null,
      meta: null,
      blockClass: "media",
      booleanClassProps: [],
      mediaLoading: false
    };
  },

  watch: {
    value: {
      deep: true,
      handler(newValue, oldValue) {
        if (
          (!oldValue && newValue && newValue.url) ||
          (oldValue &&
            oldValue.url &&
            newValue &&
            newValue.url &&
            newValue.url != oldValue.url)
        ) {
          this.loadMedia(newValue.url);
        }
      }
    }
  },

  created() {
    if (this.value && this.value.url && this.waitToLoad)
      this.loadMedia(this.value.url);
  },

  computed: {
    isUploaded() {
      if (!this.value) return false;
      return !(this.value instanceof File);
    },

    addBlockClasses() {
      const classes = [];
      if (this.ratio) classes.push("ratio", `ratio--${this.ratio}`);
      if (!this.ratio && (!this.value || this.mediaLoading))
        classes.push("ratio", "ratio--16x9");
      if (!this.value) classes.push("media--select");
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
    loadMedia(url) {
      this.mediaLoading = true;
      var img = new Image();
      img.src = url;
      img.onload = () => {
        this.mediaLoading = false;
      };
    },
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
.media--select {
  border: 2px dotted --color(grey, lighter);
}
.media__select,
.media__placeholder,
.media__loading {
  @include position(absolute, 0, 0, 0, 0);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: --color(grey, light);
}
.media__select {
  cursor: pointer;
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
