function modifyClasses(el, value, modifiers) {
  if (value) {
    const color = modifiers.light ? "light" : "dark";
    el.classList.add("loader", `loader--${color}`);
    if (modifiers.overlay) {
      const overlayColor = modifiers.light ? "dark" : "light";
      el.classList.add("overlay", `overlay--${overlayColor}`);
    }
  } else {
    el.classList.remove(
      "loader",
      "loader--dark",
      "loader--light",
      "overlay",
      "overlay--dark",
      "overlay--light"
    );
  }
}

export const loader = {
  bind: (el, { value, modifiers }) => {
    modifyClasses(el, value, modifiers);
  },
  update: (el, { value, modifiers }) => {
    modifyClasses(el, value, modifiers);
  }
};
