const defaultIcons = {
  "vmdi-plus": require("vue-material-design-icons/Plus").default,
  "vmdi-pencil": require("vue-material-design-icons/Pencil").default,
  "vmdi-image": require("vue-material-design-icons/Image").default,
  "vmdi-image-broken": require("vue-material-design-icons/ImageBroken").default,
  "vmdi-image-plus": require("vue-material-design-icons/ImagePlus").default,
  "vmdi-drag": require("vue-material-design-icons/Drag").default,
  "vmdi-minus": require("vue-material-design-icons/Minus").default,
  "vmdi-information": require("vue-material-design-icons/Information").default,
  "vmdi-check-circle": require("vue-material-design-icons/CheckCircle").default,
  "vmdi-alert": require("vue-material-design-icons/Alert").default,
  "vmdi-close": require("vue-material-design-icons/Close").default,
  "vmdi-cog": require("vue-material-design-icons/Cog").default,
  "vmdi-filter": require("vue-material-design-icons/Filter").default,
  "vmdi-refresh": require("vue-material-design-icons/Refresh").default,
  "vmdi-chevron-left": require("vue-material-design-icons/ChevronLeft").default,
  "vmdi-chevron-up": require("vue-material-design-icons/ChevronUp").default,
  "vmdi-chevron-down": require("vue-material-design-icons/ChevronDown").default,
  "vmdi-eye-outline": require("vue-material-design-icons/EyeOutline").default,
  "vmdi-eye-off-outline": require("vue-material-design-icons/EyeOffOutline")
    .default,
  "vmdi-chevron-right": require("vue-material-design-icons/ChevronRight")
    .default,
  "vmdi-minus-circle-outline": require("vue-material-design-icons/MinusCircleOutline")
    .default,
  "vmdi-plus-circle-outline": require("vue-material-design-icons/PlusCircleOutline")
    .default,
  "vmdi-close-octagon": require("vue-material-design-icons/CloseOctagon")
    .default,
  "vmdi-arrow-left-circle-outline": require("vue-material-design-icons/ArrowLeftCircleOutline")
    .default,
};

export default (Vue, userIcons = {}) => {
  const icons = Object.assign({}, defaultIcons, userIcons);
  for (var iconName in icons) {
    Vue.component(iconName, icons[iconName]);
  }
};
