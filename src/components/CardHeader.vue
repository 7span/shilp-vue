<template>
  <header class="card__header">
    <slot name="header">
      <s-icon v-if="icon" class="card__icon" :name="icon"></s-icon>
      <component :is="titleTag" v-if="title" class="card__title">
        {{
        title
        }}
      </component>
      <div v-if="$slots.actions" class="card__actions">
        <slot name="actions"></slot>
      </div>
    </slot>
  </header>
</template>

<script>
export default {
  name: "s-card-header",

  props: {
    icon: String,
    title: String,
    titleTag: {
      type: String,
      default: "h4"
    }
  }
};
</script>
