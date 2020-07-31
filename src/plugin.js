import "./scss/v-tooltip.scss";
import defaultOptions from "./default-options";
import components from "./components";
import registerIcons from "./icons";
import registerPrototypes from "./prototypes";
import registerDirectives from "./directives";

const install = (Vue, userOptions) => {
  const options = Object.assign({}, defaultOptions, userOptions);

  //Register Components
  for (var componentName in components) {
    Vue.component(componentName, components[componentName]);
  }

  registerIcons(Vue, options.vueMaterialDesignIcons);
  registerDirectives(Vue);

  Vue.mixin({
    provide: {
      //Global Request Handler
      //Used in Dynamic Form & Select component to retrive options.
      REQUEST: options.requestHandler,
    },
    created() {
      //Need to register prototypes in side created hook
      //to have access to component instance.
      registerPrototypes(Vue, this);
    },
  });
};

const plugin = {
  install,
  version: "__VERSION__",
};

export default plugin;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(plugin);
}

/**
 * Export individual components
 */
export const {
  SApp,

  SButton,
  SButtonGroup,
  SRadioButton,

  SForm,
  SField,
  STextbox,
  SCheckbox,
  SRadio,
  SSelect,
  SDropdown,
  SFieldView,
  SFile,
  SNumber,
  SNumberCustom,

  SNav,
  SNavItem,

  STab,
  STabItem,

  SModal,
  SModalContainer,
  SConfirm,

  SAlert,
  SColorPicker,
  SSwitch,
  SBreadcrumbs,
  SNotificationContainer,
  SRepeater,
  SCopy,

  SMedia,
  SText,
  SBlock,
  SIcon,

  SLayout,
  SRow,
  SColumn,
  SList,
  SGrid,
  SItem,
  STable,
} = components;

/**
 * Manual Import Components
 */
export const FieldValidate = require("./components/FieldValidate").default;
export const FormValidate = require("./components/FormValidate").default;

/**
 * Export Shilp Variables
 */
export { colors, shades } from "./shilp";

/**
 * Export Plugins
 */
export const FormPlugin = require("./plugins/form/install").default;
export const ListPlugin = require("./plugins/list/install").default;
export const ListGridTable = require("./plugins/list/layouts/GridTable")
  .default;
export const ListMasnory = require("./plugins/list/layouts/Masnory").default;
export const ListTable = require("./plugins/list/layouts/Table").default;
