<template>
  <s-grid class="media-upload" :size="thumbSize">
    <div class="media-upload__item" v-for="n in max" :key="`media--${n}`">
      <!-- MEDIA ITEM -->
      <slot name="item" :meta="mediaPreview[n]">
        <s-media ratio="16x9">
          <img v-if="isUploaded(n) !== null" :src="mediaUrl(n)" />
          <div v-else class="media-upload__select">
            <s-icon name="ImagePlus"></s-icon>
            <input
              type="file"
              :accept="accept"
              @change="pushMedia($event, n)"
            />
          </div>

          <!-- REMOVE BUTTONS -->
          <s-button
            style_="muted"
            class="media-upload__remove"
            v-if="isUploaded(n) !== null"
            @click.native="remove(n, isUploaded(n))"
            color="danger"
            size="sm"
            icon="Close"
            shape="circle"
          ></s-button>
        </s-media>
      </slot>
    </div>
  </s-grid>
</template>

<script>
export default {
  props: {
    thumbSize: {
      type: String,
      default: "200px"
    },
    max: {
      type: Number,
      default: 5
    },
    value: {
      type: Array,
      default: () => []
    },
    accept: {
      type: String,
      default: "*"
    },
    maxSize: {
      type: Number,
      default: 2 * 1024 * 1024 //2 MB
    },
    meta: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      media: [],
      mediaPreview: []
    };
  },
  watch: {
    value(nv) {
      if (nv === null || nv.length === 0) {
        this.media = [];
        this.mediaPreview = [];
      } else {
        this.media = nv;
      }
    }
  },
  methods: {
    pushMedia(e, index) {
      let file = e.target.files[0];
      if (file.size > this.maxSize) {
        alert(
          "File size is larger than " +
            this.maxSize / 1024 / 1024 +
            "MB. Please select a smaller file."
        );
        return;
      }
      this.$set(this.media, index, file);
      this.$emit("input", this.media);
      this.preview(file, index);
    },

    preview(file, index) {
      let meta = {
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + "MB",
        type: file.type
      };
      var reader = new FileReader();
      reader.onload = e => {
        meta.preview = e.target.result;
        this.$set(this.mediaPreview, index, meta);
      };
      reader.readAsDataURL(file);
    },

    remove(index, isHard) {
      if (isHard) {
        const mediaObject = this.media[n];
        this.$emit("remove", mediaObject);
      }
      this.$set(this.media, index, null);
      this.$set(this.mediaPreview, index, null);
    },

    isUploaded(index) {
      if (this.mediaPreview[index]) return false;
      if (this.media[index]) return true;
      return null;
    },

    mediaUrl(index) {
      const uploaded = this.isUploaded(index);
      if (uploaded === false) return this.mediaPreview[index].preview;
      if (uploaded === true) return this.media[index].url;
    }
  }
};
</script>

<style lang="scss">
.media-upload {
}

.media-upload__select {
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
.media-upload__remove {
  @include position(absolute, 8px, 8px, auto, auto);
}
</style>
