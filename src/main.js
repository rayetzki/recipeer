import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuelidate from "vuelidate";
import "./plugins/element.js";

Vue.use(Vuelidate);

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
