<template>
  <portal v-if="isOpen" to="modal-container" slim>
    <transition>
      <div :id="id" class="modal" :class="blockClassList" v-bind="$attrs">
        <div
          class="modal__overlay"
          @click.self="overlayClose"
          :class="overlayClasses"
        ></div>
        <div class="modal__wrapper">
          <slot v-bind="scope"></slot>
        </div>
      </div>
    </transition>
  </portal>
</template>

<script>
import component from "../mixins/component";
export default {
  name: "s-modal",
  shilp: {
    block: "modal",
    boolean: ["fullscreen"],
    variant: ["size"],
  },
  mixins: [component],
  inheritAttrs: false,
  props: {
    id: String,
    size: {
      type: String,
      default: "md",
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    fullHeight: {
      type: Boolean,
      default: false,
    },
    overlay: {
      type: [String, Boolean],
      default: "light",
    },
    closeOnOverlay: {
      type: Boolean,
      default: true,
    },
    closeOnEsc: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isOpen: false,
      scope: null,
    };
  },

  computed: {
    classList() {
      const classes = [];
      if (this.isOpen) classes.push(`modal--show`);
      if (this.fullHeight) classes.push(`modal--full-height`);
      return classes;
    },
    overlayClasses() {
      if (this.overlay === false) return;
      return ["overlay", `overlay--${this.overlay}`];
    },
  },

  mounted() {
    document.addEventListener("keyup", (e) => {
      if (e.keyCode === 27 && this.closeOnEsc) {
        this.close();
      }
    });

    this.$root.$on("shilp-modal-open", (payload) => {
      this.open(payload);
    });

    this.$root.$on("shilp-modal-close", (payload) => {
      this.close(payload);
    });
  },

  methods: {
    open(payload) {
      let { id, scope } = this.extractPayload(payload);
      if (!id) return;
      if (this.id == id) {
        this.scope = scope;
        this.isOpen = true;
      } else {
        this.scope = null;
        this.isOpen = false;
      }
      this.$emit("open", payload);
    },
    close(payload) {
      const { id } = this.extractPayload(payload);
      let shouldClose = false;
      if (id) {
        if (this.id == id) {
          shouldClose = true;
        }
      } else {
        shouldClose = true;
      }
      if (shouldClose) {
        this.scope = null;
        this.isOpen = false;
        this.$emit("close", payload);
      }
    },
    extractPayload(payload) {
      if (typeof payload === "object") {
        return payload;
      } else if (typeof payload === "string") {
        return {
          id: payload,
          scope: null,
        };
      } else {
        return {
          id: this.id,
          scope: null,
        };
      }
    },
    overlayClose() {
      if (this.closeOnOverlay) {
        this.close();
      }
    },
  },
};
</script>
