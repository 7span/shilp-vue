<template>
  <header class="card__header">
    <s-icon v-if="icon" class="card__icon" :name="icon"></s-icon>
    <h3 v-if="title" class="card__title">{{title}}</h3>
    <div v-if="$slots.actions" class="card__actions">
      <slot name="actions"></slot>
    </div>
  </header>
</template> 

<script>
export default {
  name: "s-card-header",

  props: {
    icon: String,
    title: String
  }
};
</script>