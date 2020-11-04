import Vue from 'vue'
import Vuex from 'vuex'
import { user } from './user'
import { auth } from './auth'

Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({
  modules: {
    user,
    auth
  }
})
