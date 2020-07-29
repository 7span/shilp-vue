<template>
  <s-modal class="confirm" id="shilp-confirm" overlay="dark">
    <slot>
      <div class="confirm__modal bg-light radius-4">
        <slot name="header">
          <header class="px-3 py-3 bb-lightest">
            <h4>{{ title }}</h4>
          </header>
        </slot>
        <slot class="body">
          <p class="confirm__body p-3">
            {{ message }}
          </p>
        </slot>
        <slot name="footer">
          <footer class="p-3 flex flex--right flex--fit">
            <s-button
              v-if="cancel"
              :label="cancelLabel"
              :color="cancelColor"
              theme="muted"
              @click.native="cancel()"
            />
            <s-button
              v-if="ok"
              class="ml-2"
              :label="okLabel"
              :color="okColor"
              @click.native="ok()"
            />
          </footer>
        </slot>
      </div>
    </slot>
  </s-modal>
</template>

<script>
const defaults = ref => {
  function cancel() {
    ref.$root.$emit("shilp-modal-close", "shilp-confirm");
  }
  return {
    title: "Kindly confirm.",
    message: "Are you sure you want to do this?",
    okLabel: "Ok",
    cancelLabel: "Cancel",
    okColor: "primary",
    cancelColor: "primary",
    ok: null,
    cancel
  };
};
export default {
  data() {
    return {
      title: null,
      message: null,
      okLabel: null,
      okColor: null,
      cancelLabel: null,
      cancelColor: null,
      ok: null,
      cancel: null
    };
  },

  created() {
    this.$root.$on("shilp-confirm-open", payload => {
      const defaultVals = defaults(this);
      const merged = Object.assign({}, defaultVals, payload);
      for (var key in defaultVals) {
        this[key] = merged[key];
      }

      this.$root.$emit("shilp-modal-open", "shilp-confirm");
    });
  }
};
</script>
