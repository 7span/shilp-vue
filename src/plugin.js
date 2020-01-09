import "./scss/v-tooltip.scss";
import defaultOptions from "./default-options";
import components from "./components";
import {
  open as modalOpenDirective,
  close as modalCloseDirective
} from "./directives/modal";
import { loader as loaderDirective } from "./directives/loader";

const install = (Vue, options) => {
  const requestHandler =
    options.requestHandler || defaultOptions.requestHandler;
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
    provide() {
      return {
        requestHandler: requestHandler
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
  SLayout,
  SApp,
  SButton,
  SList,
  SRow,
  SColumn,
  SIcon,
  SField,
  STextbox,
  SSelect,
  SRadio,
  SCheckbox,
  SAlert,
  SNav,
  SNavItem,
  SNavGroup,
  SMedia,
  SCard,
  SCardHeader,
  SCardBody,
  SCardFooter,
  SDropdown,
  SFieldView,
  SItem,
  SForm,
  SFile,
  STab,
  STabItem,
  SText,
  SColorPicker,
  SPerson,
  SAvatar,
  SModal,
  SModalContainer,
  SGrid,
  SBlock,
  SButtonGroup,
  SSwitch
} = components;

/**
 * Manual Import Components
 */
export const SFieldValidate = require("./components/FieldValidate").default;
export const SFormValidate = require("./components/FormValidate").default;

/**
 * Export Shilp Variables
 */
export { colors, shades } from "./shilp";
