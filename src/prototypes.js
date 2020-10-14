export default (Vue, instance) => {
  //Confirm Modal
  const confirm = (payload) => {
    instance.$root.$emit("shilp-confirm-open", payload);
  };

  //Notification
  const notify = (payload) => {
    instance.$root.$emit("shilp-notify", payload);
  };

  //Modal
  const modal = {
    open: (name) => {
      instance.$root.$emit("shilp-modal-open", name);
    },
    close: (name) => {
      instance.$root.$emit("shilp-modal-close", name);
    },
  };

  //Copy
  const copy = (text) => {
    instance.$root.$emit("shilp-copy", text);
  };

  //Breadcrumbs
  const bradcrumbs = {
    setLabel: (key, value) => {
      instance.$root.$emit("shilp-breadcrumbs-label", key, value);
    },
    setParams: (key, value) => {
      instance.$root.$emit("shilp-breadcrumbs-params", key, value);
    },
  };

  //All the prototpyes for Shilp are added under $shilp
  //This helps to avoid conflicts with other 3rd party plugins
  Vue.prototype.$shilp = { confirm, notify, modal, copy, bradcrumbs };

  //TODO: Remove this in future
  Vue.prototype.$notify = (payload) => {
    instance.$root.$emit("shilp-notify", payload);
  };
};
