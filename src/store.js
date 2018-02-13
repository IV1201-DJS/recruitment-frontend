import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import i18n from './lang/i18n'

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
        const res = await axios.post('/api/login', authInfo)
        const { token } = res.data

        localStorage.setItem('token', token)
        commit('updateLoginStatus', true)
      } catch (e) {
        console.dir(e)
        const { status, data } = e.response
        switch (status) {
          case 422: throw data.errors
          case 401:
            dispatch('displayError', i18n.t('login.invalid'))
            break
          default:
            dispatch('displayError', data)
        }
      }
    },
    async register ({ commit }, userInfo) {
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
