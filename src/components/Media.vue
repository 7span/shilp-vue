<template>
  <div class="media" :class="blockClassList" :style="inlineCss">
    <!-- IF EMBEDED -->
    <div
      class="media__wrap"
      :class="mediaRatio"
      v-if="embed"
      v-html="value"
    ></div>

    <!-- AVATAR -->
    <template v-else-if="avatar">
      <img v-if="value" :src="value" />
    </template>

    <!-- ELSE -->
    <div v-else class="media__wrap" :class="mediaRatio">
      <!-- BASE64 PREVIEW -->
      <img v-if="preview" :src="preview" />

      <!-- URL -->
      <template v-else-if="value">
        <div
          v-if="waitToLoad && loading"
          class="media__loading"
          v-shilp-loader="true"
        ></div>
        <!-- ERROR -->
        <div v-else-if="error" class="media__placeholder">
          <s-icon name="ImageBroken"></s-icon>
        </div>
        <img v-else :src="src" alt />
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
      <div class="media__remove" v-if="(value || preview) && !readonly">
        <slot name="remove">
          <s-button
            theme="muted"
            @click.native="remove"
            color="danger"
            size="sm"
            icon="Close"
            shape="circle"
          ></s-button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import component from "../mixins/component";
export default {
  name: "s-media",
  shilp: {
    block: "media",
    boolean: ["avatar"],
    variant: ["fit", "size"]
  },
  mixins: [component],
  props: {
    embed: {
      type: Boolean,
      default: false
    },
    size: Number,
    fit: String,
    position: String,
    ratio: String,
    value: [String, Object, File],
    width: String,
    height: String,
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
    },
    valueType: {
      type: String,
      default: "file"
    },
    avatar: Boolean
  },

  data() {
    return {
      preview: null,
      fileObject: null,
      meta: null,
      loading: false,
      loaded: false,
      error: false
    };
  },

  watch: {
    value: {
      deep: true,
      handler(newValue) {
        if (newValue) {
          this.loadMedia();
        } else {
          this.preview = this.meta = this.fileObject = null;
        }
        // if (
        //   (!oldValue && newValue && newValue.url) ||
        //   (oldValue &&
        //     oldValue.url &&
        //     newValue &&
        //     newValue.url &&
        //     newValue.url != oldValue.url)
        // ) {

        // }
      }
    }
  },

  created() {
    if (this.src && this.waitToLoad) this.loadMedia();
  },

  computed: {
    src() {
      if (this.value && typeof this.value === "object" && this.value.url) {
        return this.value.url;
      } else {
        return this.value;
      }
    },

    isUploaded() {
      if (!this.value) return false;
      return !(this.value instanceof File);
    },

    mediaRatio() {
      const classes = [];
      if (this.ratio) classes.push("ratio", `ratio--${this.ratio}`);
      if (!this.ratio && (!this.value || this.loading))
        classes.push("ratio", "ratio--16x9");
      return classes;
    },

    classList() {
      const classes = [];
      if (!this.value && !this.avatar) classes.push("media--select");
      if (this.preview) classes.push("media--preview");
      return classes;
    },

    inlineCss() {
      const css = {};
      if (this.position) css["--media--position"] = this.position;
      if (this.width) css["width"] = this.width;
      if (this.height) css["height"] = this.height;
      return css;
    }
  },

  methods: {
    loadMedia() {
      if (!this.src) return;

      this.loading = true;
      this.loaded = false;
      this.error = false;
      var img = new Image();
      img.src = this.src;
      img.onload = () => {
        this.loading = false;
        this.loaded = true;
        this.$emit("load");
      };
      img.onerror = () => {
        this.loading = false;
        this.loaded = false;
        this.error = true;
        this.$emit("error");
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
      this.$emit("input", null);
      this.$emit("remove");
      this.preview = this.meta = this.fileObject = null;
    },

    renderPreview() {
      var reader = new FileReader();
      this.loading = true;
      reader.onload = e => {
        this.loading = false;
        this.loaded = true;
        this.$emit("load");
        this.preview = e.target.result;

        if (this.valueType == "file") {
          this.$emit("input", this.fileObject);
        }
        if (this.valueType == "base64") {
          this.$emit("input", this.preview);
        }
      };

      reader.onerror = () => {
        this.loading = false;
        this.loaded = false;
        this.error = true;
        this.$emit("error");
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
.media--select,
.media--preview {
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
