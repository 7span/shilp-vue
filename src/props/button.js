export default {
  color: String,
  size: String,
  shape: String,
  theme: String,
  align: String,
  icon: String,
  loader: {
    type: Boolean,
    default: false
  },
  loaderColor: {
    type: String,
    default: "light"
  },
  fluid: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: null
  },
  rounded: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: "button"
  },
  to: [Object, String]
  // href: String
};
