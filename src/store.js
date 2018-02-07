import Vue from 'vue'
import Vuex from 'vuex'

import { post } from '@/tools/abstractions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false
  },
  mutations: {
    updateLoggedInStatus (state, loggedIn) {
      state.loggedIn = loggedIn
    }
  },
  actions: {
    async login ({ commit }, { username, password }) {
      try {
        const { token } = await post('/api/login', {
          username,
          password
        })

        localStorage.setItem('token', token)
        commit('updateLoggedInStatus', true)

        return true
      } catch (e) {
        // TODO: show an error message to the user
        console.error(e)

        return false
      }
    }
  }
})
