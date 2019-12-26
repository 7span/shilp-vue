<template>
  <portal to="modal-container" slim>
    <transition>
      <div v-if="open" :id="id" class="modal" :class="blockClasses" v-bind="$attrs">
        <div class="modal__overlay" :class="overlayClasses"></div>
        <div class="modal__wrapper" @click.self="overlayClose">
          <slot v-bind="scope"></slot>
        </div>
      </div>
    </transition>
  </portal>
</template>

<script>
export default {
  name: "s-modal",
  mixins: [require("../mixins/component.js").default],
  inheritAttrs: false,
  props: {
    id: String,
    size: {
      type: String,
      default: "md"
    },
    fix: {
      type: Boolean,
      default: true
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
      scope: null,
      blockClass: "modal",
      booleanClassProps: ["fix"],
      variantClassProps: ["size"]
    };
  },

  computed: {
    overlayClasses() {
      if (this.overlay === false) return;
      return ["overlay", `overlay--${this.overlay}`];
    }
  },

  mounted() {
    document.addEventListener("keyup", e => {
      if (e.keyCode === 27 && this.closeOnEsc) {
        this.open = false;
      }
    });

    this.$root.$on("shilp-modal-open", payload => {
      const { id, scope } = this.extractPayload(payload);
      if (!id) return;
      if (this.id == id) {
        this.scope = scope;
        this.open = true;
      } else {
        this.scope = null;
        this.open = false;
      }
    });

    this.$root.$on("shilp-modal-close", payload => {
      const { id } = this.extractPayload(payload);
      if (id && this.id == id) {
        this.scope = null;
        this.open = false;
      } else {
        this.scope = null;
        this.open = false;
      }
    });
  },

  methods: {
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
      if (this.closeOnOverlay) this.open = false;
    }
  }
};
</script>

<style lang="scss">
.modal__wrapper {
  cursor: zoom-out;
  > .card {
    cursor: initial;
  }
}
</style>
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
