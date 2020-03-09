<template>
  <div class="button-group" :class="blockClassList">
    <slot></slot>
  </div>
</template>

<script>
import props from "../props/button.js";
import { cloneDeep } from "lodash";
import component from "../mixins/component";

export default {
  name: "s-button-group",
  shilp: {
    block: "button-group",
    boolean: ["fluid", "stack"]
  },
  mixins: [component],

  props: {
    ...cloneDeep(props),
    fluid: Boolean,
    stack: Boolean
  }
};
</script>
