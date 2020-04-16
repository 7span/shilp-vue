<template>
  <div class="v-list__settings">
    <!-- LIMIT, PER PAGE RESULTS -->
    <s-field
      class="v-list__per-page"
      v-if="currentPerPageOptions.length > 0"
      label="Per Page"
      size="sm"
    >
      <s-select
        :value="perPage"
        @input="$emit('per-page', parseInt($event))"
        :options="currentPerPageOptions"
      />
    </s-field>

    <!-- SHOW/HIDE ATTRIBUTES -->
    <s-field class="v-list__attributes" label="Visible Attributes">
      <div class="v-list__attributes-list">
        <s-field
          v-for="(attr, index) in allAttrs"
          :label="attr.label"
          :key="`attr-${index}`"
          inline
        >
          <s-switch
            size="xxs"
            theme="outline"
            color="primary"
            shape="pill"
            :id="attr.name"
            :value="attr.visible"
            @input="updateAttr(index, attr.name, 'visible', $event)"
          />
        </s-field>
      </div>
    </s-field>

    <div class="v-list__custom-settings">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    perPage: Number,
    perPageOptions: Array,
    allAttrs: Array
  },

  computed: {
    currentPerPageOptions() {
      const options = this.perPageOptions;
      //If the limit is set to 0
      //Add "All" option to dropdown
      //Only if user has nnot provided blank array. This is to hide dropdown
      if (this.perPage == 0 && this.perPageOptions.length > 0) {
        options.push({
          value: 0,
          label: "All"
        });
      }

      return options;
    }
  },

  methods: {
    updateAttr(index, name, key, value) {
      this.$emit("updateAttr", { index, name, key, value });
    }
  }
};
</script>

<style lang="scss" scoped>
.v-list__settings {
}
.v-list__attributes {
  margin-top: --space(4);
}
.v-list__attributes-list {
  display: grid;
  gap: --space(2);
  padding: --space(3);
  background: --color(grey, lightest);
}
.v-list__custom-settings {
  margin-top: --space(4);
}
</style>
