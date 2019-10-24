<template>
  <form class="form" @submit.prevent="$emit('submit')">
    <header class="form__header">
      <s-alert
        v-if="errorMessage"
        class="mb--md"
        color="danger"
        style_="muted"
        fluid
      >{{errorMessage}}</s-alert>
      <slot name="header"></slot>
    </header>
    <div class="form__body">
      <slot></slot>
    </div>
    <footer class="form__footer">
      <slot name="footer"></slot>
    </footer>
  </form>
</template>

<script>
export default {
  name: "s-form",

  props: {
    errorMessage: String
  }
};
</script>