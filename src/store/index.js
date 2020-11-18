import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { user } from "./user";
import { auth } from "./auth";
import { recipes } from "./recipes";

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  modules: {
    user,
    auth,
    recipes
  },
  plugins: [createPersistedState()]
});
