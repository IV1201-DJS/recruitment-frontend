import Vue from 'vue'
import Vuex from 'vuex'

import { post } from '@/tools/abstractions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    loginRedirect: '/'
  },
  mutations: {
    updateLoginStatus (state, loggedIn) {
      state.loggedIn = loggedIn
    },
    updateLoginRedirect (state, loginRedirect) {
      state.loginRedirect = loginRedirect
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
        commit('updateLoginStatus', true)

        return true
      } catch (e) {
        // TODO: show an error message to the user
        console.error(e)

        return false
      }
    }
  }
})
