import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
Vue.config.productionTip = false;

import plugin from "./plugin.js";
Vue.use(plugin, {
  axios: axios,
});

require("shilp/scss/styles.scss");

new Vue({
  render: (h) => h(App),
}).$mount("#app");
