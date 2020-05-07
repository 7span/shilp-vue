export const open = {
  bind: (el, binding, vnode) => {
    const self = vnode.context;
    const id = binding.arg;
    el.addEventListener("click", () => {
      self.$root.$emit("shilp-modal-open", id);
    });
  },
};

export const close = {
  bind: (el, binding, vnode) => {
    const self = vnode.context;
    const id = binding.arg;
    el.addEventListener("click", () => {
      self.$root.$emit("shilp-modal-close", id);
    });
  },
};
