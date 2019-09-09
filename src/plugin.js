const install = (Vue, options = {}) => {
  //Components
  Vue.component("SButton", require("./components/Button").default);
  Vue.component("SButtons", require("./components/Buttons").default);
  Vue.component("SBlocks", require("./components/Blocks").default);
  Vue.component("SBlock", require("./components/Block").default);
  Vue.component("SIcon", require("./components/Icon").default);
  Vue.component("SField", require("./components/Field").default);
  Vue.component("STextbox", require("./components/Textbox").default);
  Vue.component("SSelect", require("./components/Select").default);
  Vue.component("SRadio", require("./components/Radio").default);
  Vue.component("SCheckbox", require("./components/Checkbox").default);
  Vue.component("SNav", require("./components/Nav").default);
  Vue.component("SNavItem", require("./components/NavItem").default);
  Vue.component("SNavGroup", require("./components/NavGroup").default);
  Vue.component("SLayout", require("./components/Layout").default);

  //Vue Material Design Icons
  for (var key in options.vueMaterialDesignIcons) {
    Vue.component(key, options.vueMaterialDesignIcons[key]);
  }
};

const plugin = {
  install,
  version: "__VERSION__"
};

export default plugin;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}
