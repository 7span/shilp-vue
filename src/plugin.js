import "./scss/v-tooltip.scss";
import defaultOptions from "./default-options";
import components from "./components";
import {
  open as modalOpenDirective,
  close as modalCloseDirective
} from "./directives/modal";
import { loader as loaderDirective } from "./directives/loader";

export let events = null;

const install = (Vue, options) => {
  const vueMaterialDesignIcons = {
    ...defaultOptions.vueMaterialDesignIcons,
    ...(options.vueMaterialDesignIcons || {})
  };

  //Register Components
  for (var componentName in components) {
    Vue.component(componentName, components[componentName]);
  }

  //Vue Material Design Icons
  for (var iconName in vueMaterialDesignIcons) {
    Vue.component(iconName, vueMaterialDesignIcons[iconName]);
  }

  //Provide Options
  Vue.mixin({
    provide: {
      REQUEST: options.requestHandler
    },
    created() {
      Vue.prototype.$notify = payload => {
        this.$root.$emit("shilp-notify", payload);
      };
    }
  });

  //Directives
  Vue.directive("shilp-modal-open", modalOpenDirective);
  Vue.directive("shilp-modal-close", modalCloseDirective);
  Vue.directive("shilp-loader", loaderDirective);
};

const plugin = {
  install,
  version: "__VERSION__"
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
  STable
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
