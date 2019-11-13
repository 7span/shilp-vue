import "./scss/v-tooltip.scss";
import defaultOptions from "./default-options";
import components from "./components";

const install = (Vue, options) => {
  const mergedOptions = {
    ...defaultOptions,
    ...options
  };

  //Register Components
  for (var componentName in components) {
    Vue.component(componentName, components[componentName]);
  }

  //Vue Material Design Icons
  for (var iconName in options.vueMaterialDesignIcons) {
    Vue.component(iconName, options.vueMaterialDesignIcons[iconName]);
  }

  //Provide Options
  Vue.mixin({
    provide() {
      return {
        requestHandler: mergedOptions.requestHandler
      };
    }
  });

  //Directives
  //Modal
  Vue.directive("shilp-modal-open", {
    bind: (el, binding, vnode) => {
      const self = vnode.context;
      const id = binding.arg;
      let data = binding.expression;
      try {
        data = JSON.parse(data);
      } catch (err) {
        console.error(
          "Invalid JSON provided in directive's expression. Expression should be valid JSON with double quotes",
          err
        );
      }
      el.addEventListener("click", () => {
        self.$root.$emit("shilp-modal-open", { id, data });
      });
    }
  });

  Vue.directive("shilp-modal-close", {
    bind: (el, binding, vnode) => {
      const self = vnode.context;
      const id = binding.arg;
      el.addEventListener("click", () => {
        self.$root.$emit("shilp-modal-close", id);
      });
    }
  });
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
  SButton,
  SList,
  SBlocks,
  SBlock,
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
  SCard,
  SCardMedia,
  SCardHeader,
  SCardBody,
  SCardFooter,
  SDropdown,
  SFieldView,
  SItem,
  SForm,
  SFile,
  STabs,
  STab,
  SText,
  SColorPicker,
  SPerson,
  SAvatar,
  SModal,
  SModalContainer
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
