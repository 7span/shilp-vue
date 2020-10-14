<template>
  <div class="media" :class="blockClassList" :style="inlineCss">
    <!-- IF EMBEDED -->
    <div
      class="media__wrap"
      :class="mediaRatio"
      v-if="embed"
      v-html="value"
    ></div>

    <!-- ELSE -->
    <div v-else class="media__wrap" :class="mediaRatio">
      <!-- URL -->
      <template v-if="value">
        <div v-if="loading" class="media__loading shimmer radius-2" />
        <div v-else-if="error" class="media__placeholder">
          <s-icon name="vmdi-image-broken" />
        </div>
        <img v-else :src="src" />
      </template>

      <!-- SELECT -->
      <div v-else-if="!readonly" class="media__select">
        <s-icon name="vmdi-image-plus" />
      </div>

      <!-- FALLBACK -->
      <div v-else class="media__placeholder">
        <s-icon name="vmdi-image" />
      </div>

      <!-- INPUT -->
      <input
        ref="input"
        type="file"
        :accept="accept"
        onclick="this.value = null"
        @change="select($event)"
      />
    </div>

    <!-- REMOVE BUTTON -->
    <div class="media__actions" v-if="value && !readonly">
      <slot name="actions" :remove="remove" :change="change">
        <s-button
          v-if="changeable"
          class="media__change mr-1"
          theme="muted"
          @click.native="change"
          color="primary"
          size="sm"
          icon="vmdi-pencil"
          shape="circle"
        />
        <s-button
          v-if="removable"
          class="media__remove"
          theme="muted"
          @click.native="remove"
          color="danger"
          size="sm"
          icon="vmdi-close"
          shape="circle"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import component from "../mixins/component";
export default {
  name: "s-media",
  shilp: {
    block: "media",
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
    removable:{
      type:Boolean,
      default:true
    },
    changeable:{
      type:Boolean,
      default:true
    }
  },

  data() {
    return {
      meta: null,
      loading: false,
      loaded: false,
      error: false,
      src: null
    };
  },

  watch: {
    value: {
      deep: true,
      handler(newValue) {
        if (newValue) {
          this.readFile(newValue)
            .then(res => {
              this.src = res;
            })
            .catch(() => {});
        } else {
          this.meta = null;
        }
      }
    }
  },

  created() {
    if (this.value) {
      this.readFile(this.value)
        .then(res => {
          this.src = res;
        })
        .catch(() => {});
    }
  },

  computed: {
    mediaRatio() {
      const classes = [];
      if (this.ratio) classes.push("ratio", `ratio--${this.ratio}`);
      if (!this.ratio && (!this.value || this.loading))
        classes.push("ratio", "ratio--16x9");
      return classes;
    },

    classList() {
      const classes = [];
      if (!this.readonly) {
        classes.push("media--select");
      }
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
    readFile(value) {
      this.loading = true;
      this.loaded = false;
      this.error = false;
      const isFile = value instanceof File;

      let img;
      if (isFile) {
        img = new FileReader();
      } else {
        img = new Image();
      }

      return new Promise((resolve, reject) => {
        img.onload = e => {
          this.loading = false;
          this.loaded = true;
          this.$emit("load");
          if (isFile) {
            resolve(e.target.result);
          } else {
            resolve(img.src);
          }
        };
        img.onerror = err => {
          this.loading = false;
          this.loaded = false;
          this.error = true;
          this.$emit("error");
          reject(err);
        };

        if (isFile) {
          img.readAsDataURL(value);
        } else {
          if (typeof value == "object") {
            img.src = value.url;
          } else {
            img.src = value;
          }
        }
      });
    },

    async select(e) {
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
      this.meta = meta;
      if (this.valueType == "file") {
        this.$emit("input", file);
      } else if (this.valueType == "base64") {
        this.readFile(file)
          .then(res => {
            this.$emit("input", res);
          })
          .catch(() => {});
      }
    },

    remove() {
      this.$emit("input", null);
      this.$emit("remove");
      this.meta = null;
    },

    change(){
      this.$refs.input.click()
    }
  }
};
</script>

<style lang="scss">
.media {
  position: relative;
  input {
    @include position(absolute, 0, 0, 0, 0);
    width: 100%;
    opacity: 0;
    font-size: 0;
    cursor: pointer;
  }
  &:hover{
    .media__actions{
      opacity: 1;
    }
  }
}
.media--select {
  .media__wrap{
    border: 2px dotted --color(grey, lighter);
  }
}
.media__select,
.media__placeholder,
.media__loading {
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: --color(grey, light);
}
.media__select {
  cursor: pointer;
}
.media__actions {
  opacity: 0;
  @include position(absolute, 8px, 8px, auto, auto);
}
</style>
