import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import admin from './modules/admin'
import locations from './modules/locations'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth, admin, locations
  }
})
