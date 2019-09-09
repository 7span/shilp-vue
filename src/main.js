import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import plugin from "./plugin.js";
Vue.use(plugin);

require("@7span/shilp/scss/styles.scss");

new Vue({
  render: h => h(App)
}).$mount("#app");
