import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    admin: {}
  },
  getters: {
    getAdmin: state => state.admin
  },
  mutations: {
    setAdmin: (state, admin) => {
      if (admin) state.admin = admin
      else state.admin = {}
    }
  },
  actions: {
    SetAdmin: ({
      commit
    }, admin) => commit('setAdmin', admin)
  },
  modules: {}
})