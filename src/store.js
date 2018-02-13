import Vue from 'vue'
import Vuex from 'vuex'

import { post } from '@/tools/abstractions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn: false,
    loginRedirect: '/',
    snackbar: {
      visible: false
    }
  },
  mutations: {
    updateLoginStatus (state, loggedIn) {
      state.loggedIn = loggedIn
    },
    updateLoginRedirect (state, loginRedirect) {
      state.loginRedirect = loginRedirect
    },
    updateSnackbar (state, update) {
      state.snackbar = {
        visible: true,
        timeout: 3000,
        message: '',
        color: '',
        top: false,
        right: false,
        bottom: false,
        left: false,
        ...update
      }
    }
  },
  actions: {
    async login ({ commit, dispatch }, authInfo) {
      try {
        const { token } = await post('/api/login', authInfo)

        localStorage.setItem('token', token)
        commit('updateLoginStatus', true)
      } catch (e) {
        dispatch('displayError', e.message)
      }
    },
    displayError ({ commit }, message) {
      commit('updateSnackbar', {
        bottom: true,
        message,
        color: 'error'
      })
    },
    displayMessage ({ commit }, message) {
      commit('updateSnackbar', {
        bottom: true,
        message
      })
    },
    displaySuccessMessage ({ commit }, message) {
      commit('updateSnackbar', {
        bottom: true,
        message,
        color: 'success'
      })
    }
  }
})
