import { merge } from "lodash";

export default {
  computed: {
    inheritPropsFrom() {
      return this.$options.shilp && this.$options.shilp.inheritPropsFrom;
    },
    parentComponent() {
      return this.$parent.$options.name;
    },
    propsWithParent() {
      const mergedProps = {};
      return merge(mergedProps, this.$parent.$props, this.$props);
    }
  }
};
