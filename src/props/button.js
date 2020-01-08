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
    type: Boolean,
    default: false
  },
  rounded: {
    type: Boolean,
    default: false
  }
  // to: [Object, String],
  // href: String
};
