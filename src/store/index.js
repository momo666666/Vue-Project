
import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/dist/logger'
// import createPersistedState from 'vuex-persistedstate'
// import VuexPersistence from 'vuex-persist'

import {state} from './state'
import {mutations} from './mutations'
import {actions} from './actions'
import {getters} from './getters'
// import * as Cookies from 'js-cookie'

import user from './modules/auth/user'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    user
    // project
  },
  strict: debug,
  plugins: debug ? [] : []
})
