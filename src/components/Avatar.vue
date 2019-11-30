<template>
  <div class="avatar" :class="blockClasses" :data-initials="initialsValue">
    <img v-if="url" :src="url" />
  </div>
</template>

<script>
export default {
  name: "s-avatar",
  mixins: [require("../mixins/component.js").default],

  data() {
    return {
      blockClass: "avatar",
      booleanClassProps: [""],
      variantClassProps: ["size"]
    };
  },

  props: {
    url: String,
    name: String,
    initials: {
      type: [Boolean, String],
      default: ""
    },
    size: {
      type: String,
      default: "md"
    }
  },
  computed: {
    initialsValue() {
      if (this.initials === false) return "";
      else if (this.initials) return this.initials;
      else if (this.name) {
        return this.name
          .split(" ")
          .map(word => word.charAt(0))
          .join("");
      } else return "";
    }
  }
};
</script>