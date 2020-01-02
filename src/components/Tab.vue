<template>
  <div class="tab" :class="blockClasses">
    <div class="tab__items">
      <slot></slot>
    </div>
    <div class="tab__view">
      <template v-for="tab in tabList">
        <div
          class="tab__content"
          :class="`tab__content--${tab}`"
          v-show="tab == activeTab"
          :key="`tab--${tab}`"
        >
          <slot :name="tab"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import buttonProps from "../props/button.js";

export default {
  name: "s-tab",
  mixins: [require("../mixins/component.js").default],

  props: {
    ...buttonProps,
    value: String,
    fullHeight: Boolean
  },

  data() {
    return {
      blockClass: "tab",
      booleanClassProps: [],
      variantClassProps: [],
      localActiveTab: null
    };
  },

  computed: {
    addBlockClasses() {
      const classes = [];
      if (this.fullHeight) classes.push("tab--full-height");
      return classes;
    },
    activeTab() {
      if (this.localActiveTab) {
        return this.localActiveTab;
      } else if (this.value && this.tabList.includes(this.value)) {
        return this.value;
      } else if (this.tabList[0]) {
        return this.tabList[0];
      } else {
        return null;
      }
    },
    tabList() {
      if (this.$slots.default) {
        return this.$slots.default.map((item, index) => {
          if (item.componentOptions.propsData.name) {
            return item.componentOptions.propsData.name;
          } else {
            console.warn(
              `SHILP-VUE: Tab at index ${index} does not have a name.`
            );
          }
        });
      } else {
        return [];
      }
    }
  },

  methods: {
    change(name) {
      this.localActiveTab = name;
    }
  }
};
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  flex-direction: column;
}
.tab--full-height {
  height: 100%;
  .tab__view {
    min-height: 0;
  }
  .tab__content {
    height: 100%;
    overflow: auto;
  }
}
.tab__items {
  flex: 0 0 auto;
  overflow: auto;
}
.tab__view {
  flex: 1 1 auto;
}
</style>
