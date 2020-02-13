<template>
  <portal to="modal-container" slim>
    <transition>
      <div
        v-if="open"
        :id="id"
        class="modal"
        :class="blockClassList"
        v-bind="$attrs"
      >
        <div class="modal__overlay" :class="overlayClasses"></div>
        <div class="modal__wrapper" @click.self="overlayClose">
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
    boolean: [],
    variant: ["size"]
  },
  mixins: [component],
  inheritAttrs: false,
  props: {
    id: String,
    size: {
      type: String,
      default: "md"
    },
    fullHeight: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: [String, Boolean],
      default: "light"
    },
    closeOnOverlay: {
      type: Boolean,
      default: true
    },
    closeOnEsc: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      open: false,
      scope: null
    };
  },

  computed: {
    classList() {
      const classes = [];
      if (this.fullHeight) classes.push(`modal--full-height`);
      if (this.open) classes.push(`modal--show`);
      return classes;
    },
    overlayClasses() {
      if (this.overlay === false) return;
      return ["overlay", `overlay--${this.overlay}`];
    }
  },

  mounted() {
    document.addEventListener("keyup", e => {
      if (e.keyCode === 27 && this.closeOnEsc) {
        this.close();
      }
    });

    this.$root.$on("shilp-modal-open", payload => {
      let { id, scope } = this.extractPayload(payload);
      console.log(id, scope);
      if (!id) return;
      if (this.id == id) {
        this.scope = scope;
        this.open = true;
      } else {
        this.scope = null;
        this.open = false;
      }
      this.$emit("open");
    });

    this.$root.$on("shilp-modal-close", payload => {
      const { id } = this.extractPayload(payload);
      if (id) {
        if (this.id == id) {
          this.close();
        }
      } else {
        this.close();
      }
    });
  },

  methods: {
    close() {
      this.scope = null;
      this.open = false;
      this.$emit("close");
    },
    extractPayload(payload) {
      if (typeof payload === "object") {
        return payload;
      }
      if (typeof payload === "string") {
        return {
          id: payload,
          scope: null
        };
      }
      return { id: null, scope: null };
    },
    overlayClose() {
      if (this.closeOnOverlay) {
        this.close();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
.v-enter-active {
  transition: all 0.3s ease 0s;
}
.v-leave-active {
  transition: all 0.3s ease 0s;
}
</style>
