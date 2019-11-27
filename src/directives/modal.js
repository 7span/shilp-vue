export const open = {
  bind: (el, binding, vnode) => {
    const self = vnode.context;
    const id = binding.arg;
    let data = binding.expression;
    if (data) {
      try {
        data = JSON.parse(data);
      } catch (err) {
        console.error(
          "Invalid JSON provided in directive's expression. Expression should be valid JSON with double quotes",
          err
        );
      }
    }
    el.addEventListener("click", () => {
      self.$root.$emit("shilp-modal-open", { id, data });
    });
  }
};

export const close = {
  bind: (el, binding, vnode) => {
    const self = vnode.context;
    const id = binding.arg;
    el.addEventListener("click", () => {
      self.$root.$emit("shilp-modal-close", id);
    });
  }
};
