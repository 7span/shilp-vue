const components = {
  SLayout: require("./components/Layout").default,
  SButton: require("./components/Button").default,
  SButtons: require("./components/Buttons").default,
  SBlocks: require("./components/Blocks").default,
  SBlock: require("./components/Block").default,
  SIcon: require("./components/Icon").default,
  SAlert: require("./components/Alert").default,

  //FORM
  SForm: require("./components/Form").default,
  SField: require("./components/Field").default,
  STextbox: require("./components/Textbox").default,
  STextarea: require("./components/Textarea").default,
  SCheckbox: require("./components/Checkbox").default,
  SRadio: require("./components/Radio").default,
  SSelect: require("./components/Select").default,
  SSelectPlus: require("./components/SelectPlus").default,
  SFieldView: require("./components/FieldView").default,
  SFile: require("./components/File").default,

  //NAV
  SNav: require("./components/Nav").default,
  SNavItem: require("./components/NavItem").default,

  //CARD
  SCard: require("./components/Card").default,
  SCardMedia: require("./components/CardMedia").default,
  SCardHeader: require("./components/CardHeader").default,
  SCardBody: require("./components/CardBody").default,
  SCardFooter: require("./components/CardFooter").default,

  SItem: require("./components/Item").default
};

const install = (Vue, options = {}) => {
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
        AXIOS: options.axios
      };
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
  SButtons,
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
  SSelectPlus,
  SFieldView,
  SItem,
  SForm,
  SFile
} = components;

/**
 * Manual Import Components
 */
export const SFieldValidate = require("./components/FieldValidate").default;
export const SFormValidate = require("./components/FormValidate").default;

/**
 * Export Shilp Variables
 */
/**
 * Colors
 */
export const brandColors = ["primary", "secondary", "accent"];
export const statusColors = ["info", "success", "warning", "danger"];
export const neutralColors = ["grey", "light", "dark"];
export const colors = [...brandColors, ...statusColors, ...neutralColors];
export const shades = [
  "lightest",
  "lighter",
  "light",
  "default",
  "dark",
  "darker",
  "darkest"
];

/**
 * Sizes
 */
export const sizes = ["xs", "sm", "md", "lg", "xl"];
