<template>
  <transition-group
    tag="div"
    class="notification-container"
    :style="inlineStyle"
  >
    <s-alert
      class="notification g-2"
      :class="{ 'flex--middle': !notification.message }"
      v-for="(notification, index) in notifications"
      :color="notification.type"
      :title="notification.title"
      :icon="notification.icon"
      :key="`notification-${index}`"
    >
      <p v-if="notification.message">
        {{ notification.message }}
      </p>
    </s-alert>
  </transition-group>
</template>

<script>
import { uid } from "./../utils";

const icons = {
  info: "vmdi-information",
  success: "vmdi-check-circle`",
  warning: "vmdi-alert",
  danger: "vmdi-close-octagon",
};
const defaults = {
  type: "info",
  icon: icons["info"],
  duration: 3000,
};

export default {
  name: "s-notification-container",
  props: {
    width: {
      type: String,
      default: "300px",
    },
    top: {
      type: String,
      default: "8px",
    },
    right: {
      type: String,
      default: "8px",
    },
    left: {
      type: String,
      default: "auto",
    },
    bottom: {
      type: String,
      default: "auto",
    },
  },
  data() {
    return {
      notifications: [],
    };
  },
  created() {
    this.$root.$on("shilp-notify", (payload) => {
      this.push({ ...defaults, ...payload });
    });
  },
  computed: {
    inlineStyle() {
      return {
        top: this.top,
        right: this.right,
        bottom: this.bottom,
        left: this.left,
        width: this.width,
      };
    },
  },
  methods: {
    push(data) {
      if (data.duration) {
        const nid = uid();
        data.uid = nid;
        setTimeout(() => {
          const removeIndex = this.notifications.find((notification, index) => {
            if (notification.uid == nid) return index;
          });
          this.notifications.splice(removeIndex, 1);
        }, data.duration);
      }
      this.notifications.push(data);
    },
  },
};
</script>

<style lang="scss">
.notification-container {
  position: fixed;
  z-index: 101;
  display: flex;
  flex-direction: column;
  &.v-enter {
    opacity: 0;
  }
  &.v-enter-to {
    opacity: 1;
  }
  &.v-leave-to {
    opacity: 0;
  }
  &.v-enter-active {
    transition: all 0.3s ease 0s;
  }
  &.v-leave-active {
    transition: all 0.3s ease 0s;
  }
}
.notification {
  + .notification {
    margin-top: --space(2);
  }
}
</style>
