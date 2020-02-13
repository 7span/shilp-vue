const install = (Vue, options) => {
  let appWithOptions = Vue.extend({
    extends: require("./Form").default,
    data() {
      return {
        ...options
      };
    }
  });

  Vue.component("SpForm", appWithOptions);
  Vue.component("SpFormRepeater", require("./Repeater.vue").default);
  Vue.component("SpFormField", require("./Field.vue").default);
  Vue.component("SpFormGroup", require("./Group.vue").default);
};

const plugin = {
  install
};

export default plugin;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}
