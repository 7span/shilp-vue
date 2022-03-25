import Vue from "vue";
import "./vee-validate";
import { FieldValidate, FormValidate } from "../../plugin.js";
import vTooltip from "v-tooltip";

/**
 * Popover
 */
Vue.use(vTooltip, {
  defaultBoundariesElement: document.body,
});

Vue.component("SFieldValidate", FieldValidate);

Vue.component("SFormValidate", FormValidate);
