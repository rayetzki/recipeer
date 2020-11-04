import Vue from 'vue'
import Vuex from 'vuex'
import { user } from './user'

Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({
  modules: {
    user
  }
})
