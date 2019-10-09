export default {
  computed: {
    blockClasses() {
      let classes = [
        ...this.booleanClasses(this.blockClass, this.booleanClassProps),
        ...this.variantClasses(this.blockClass, this.variantClassProps)
      ];
      if (this.addBlockClasses) {
        classes.push(...this.addBlockClasses);
      }
      return classes;
    }
  },
  methods: {
    booleanClasses(block, props = []) {
      let classes = [];
      props.forEach(prop => {
        if (this[prop]) {
          classes.push(`${block}--${prop}`);
        }
      });
      return classes;
    },

    variantClasses(block, props = []) {
      let classes = [];
      props.forEach(prop => {
        if (this[prop]) {
          classes.push(`${block}--${this[prop]}`);
        }
      });
      return classes;
    }
  }
};
