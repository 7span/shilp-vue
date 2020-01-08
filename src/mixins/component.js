export default {
  computed: {
    blockClassList() {
      const classList = [];
      let propSource = this;

      // If the component is child, the props can be inherited from a parent
      // In that case, instead of using default props of component
      // We'll use the merged props.
      if (
        this.inheritPropsFrom &&
        this.parentComponent &&
        this.parentComponent == this.inheritPropsFrom
      ) {
        propSource = this.propsWithParent;
      }

      // Boolean BEM Classes
      if (this.$options.shilp.boolean) {
        this.$options.shilp.boolean.forEach(prop => {
          if (propSource[prop]) {
            classList.push(`${this.$options.shilp.block}--${prop}`);
          }
        });
      }

      // Variant BEM Classes
      if (this.$options.shilp.variant) {
        this.$options.shilp.variant.forEach(prop => {
          if (propSource[prop]) {
            classList.push(`${this.$options.shilp.block}--${propSource[prop]}`);
          }
        });
      }

      // If additional classes are provided
      if (this.classList) {
        classList.push(...this.classList);
      }

      return classList;
    }
  }
};
