<template>
  <div class="form">
    <header class="form__header">
      <transition name="fade">
        <s-alert
          v-if="errorMessage"
          class="mb--md"
          color="danger"
          style_="muted"
          fluid
        >{{errorMessage}}</s-alert>
      </transition>
      <slot name="header"></slot>
    </header>
    <div class="form__body">
      <slot></slot>
    </div>
    <footer class="form__footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "s-form",

  props: {
    errorMessage: String
  }
};
</script>