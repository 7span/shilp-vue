<template>
  <div class="tab" :class="blockClassList">
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
import component from "../mixins/component";

export default {
  name: "s-tab",
  shilp: {
    block: "tab"
  },
  mixins: [component],

  props: {
    ...buttonProps,
    value: String,
    fullHeight: Boolean
  },

  data() {
    return {
      localActiveTab: null
    };
  },

  computed: {
    classList() {
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

  mounted() {
    this.$emit("input", this.activeTab);
  },

  methods: {
    change(name) {
      this.$emit("input", name);
      this.localActiveTab = name;
    }
  }
};
</script>

<style lang="scss">
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
