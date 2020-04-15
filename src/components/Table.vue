<template>
  <table class="table" :class="blockClassList">
    <thead>
      <slot name="header" />
    </thead>
    <tbody>
      <slot />
    </tbody>
    <tfoot>
      <slot name="footer" />
    </tfoot>
  </table>
</template>

<script>
import component from "../mixins/component";

export default {
  name: "s-table",
  mixins: [component],
  props: {
    edge: Boolean,
    fix: Boolean,
    border: [Boolean, String],
    size: Number
  },
  shilp: {
    block: "table",
    boolean: ["edge", "fix"],
    variant: ["size"]
  },
  computed: {
    classList() {
      let classlist = [];
      if (this.border === true) classlist.push(`table--border`);
      if (typeof this.border === "string")
        classlist.push(`table--border-${this.border}`);
      return classlist;
    }
  }
};
</script>
