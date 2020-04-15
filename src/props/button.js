export default {
  color: String,
  size: String,
  shape: String,
  theme: String,
  align: String,
  icon: String,
  emoji: String,
  loaderColor: {
    type: String,
    default: "light",
  },
  label: {
    type: [Number, String],
  },
  type: {
    type: String,
    default: "button",
  },
  to: [Object, String],
  loader: Boolean,
  fluid: Boolean,
  active: Boolean,
  badge: Boolean,
  wrap: Boolean,
};
