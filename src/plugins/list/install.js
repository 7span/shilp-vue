import defaultOptions from "./options";

const install = (Vue, options = {}) => {
  Vue.component("SpList", {
    extends: require("./List.vue").default,
    provide: {
      OPTIONS: Object.assign(defaultOptions, options)
    },
    data() {
      return {
        options
      };
    }
  });
};

const plugin = {
  install
};

export default plugin;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}
