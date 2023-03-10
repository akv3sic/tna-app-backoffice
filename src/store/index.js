import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import admin from './modules/admin'
import locations from './modules/locations'
import categories from './modules/categories'
import events from './modules/events'
import users from './modules/users'
import settings from './modules/settings'
import tna from './modules/tna'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth, admin, locations, categories, events, users, settings, tna
  }
})
