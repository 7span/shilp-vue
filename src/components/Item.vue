<template>
  <div class="item" :class="blockClassList">
    <div class="item__media">
      <slot name="media"></slot>
    </div>
    <div class="item__title">
      <slot name="title"></slot>
    </div>
    <div class="item__body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import component from "../mixins/component";
export default {
  name: "s-item",
  shilp: {
    block: "item",
    variant: []
  },
  mixins: [component],
  props: {}
};
</script>
