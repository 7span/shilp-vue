<template>
  <transition-group class="notification-container">
    <s-alert
      class="notification"
      v-for="(notification, index) in notifications"
      :color="notification.type"
      :title="notification.title"
      :icon="notification.icon"
      :key="`notification-${index}`"
    >
      {{ notification.message }}
    </s-alert>
  </transition-group>
</template>

<script>
import { uid } from "./../utils";

const icons = {
  info: "Information",
  success: "CheckCircle",
  warning: "Alert",
  danger: "CloseOctagon"
};
const defaults = {
  type: "info",
  icon: icons["info"],
  duration: 3000
};

export default {
  name: "s-notification-container",
  data() {
    return {
      notifications: []
    };
  },
  created() {
    this.$root.$on("shilp-notify", payload => {
      this.push({ ...defaults, ...payload });
    });
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
    }
  }
};
</script>

<style lang="scss" scoped>
.notification-container {
  position: fixed;
  z-index: 99;
  top: --space(3);
  right: --space(3);
  display: flex;
  flex-direction: column;
}
.notification {
  + .notification {
    margin-top: --space(2);
  }
}
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
