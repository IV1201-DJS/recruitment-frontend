// @ts-check
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
    },
    legacyUser: null
  },
  mutations: {
    updateLegacyUser (state, legacyUser) {
      state.legacyUser = legacyUser
    },
    updateLoginStatus (state, loggedIn) {
      state.loggedIn = loggedIn
    },
    updateLoginRedirect (state, loginRedirect) {
      state.loginRedirect = loginRedirect
    },
    updateSnackbar (state, update) {
      // Remove the current snackbar
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
    /**
     * Tries to authenticate the user using the provided credentials.
     * @param {any} param0
     * @param {{ username: String, password: String }} authInfo The info to authenticate the user with.
     */
    async login ({ commit, dispatch }, authInfo) {
      try {
        const res = await axios.post('/api/login', authInfo)
        const { token } = res.data

        localStorage.setItem('token', token)
        commit('updateLoginStatus', true)
        dispatch('displaySuccessMessage', i18n.t('login.success'))
      } catch (e) {
        const { status, data } = e.response
        switch (status) {
          case 422: throw data.errors
          case 401:
            dispatch('displayError', i18n.t('login.invalid'))
            break
          case 409:
            commit('updateLegacyUser', data.legacyUser)
            dispatch('displayError', i18n.t('migration.mustUpdate'))
            throw status
          default:
            dispatch('displayError', data)
        }
      }
    },
    /**
     * Tries to register a user using the provided credentials.
     * @param {any} param0
     * @param {Object} userInfo
     * @param {String} userInfo.username
     * @param {String} userInfo.firstName
     * @param {String} userInfo.lastName
     * @param {String} userInfo.ssn
     * @param {String} userInfo.email
     */
    async register ({ commit, dispatch }, userInfo) {
      try {
        await axios.post('/api/register', userInfo)
        dispatch('displaySuccessMessage', i18n.t('register.success'))
      } catch (e) {
        const { status, data } = e.response
        switch (status) {
          case 422: throw data.errors
          default:
            dispatch('displayError', data)
        }
      }
    },
    /**
     * Displays an error message to the user in the form of a snackbar.
     * @param {any} param0
     * @param {String} message The message to display.
     */
    displayError ({ commit }, message) {
      commit('updateSnackbar', {
        bottom: true,
        message,
        color: 'error'
      })
    },
    /**
     * Displays a message to the user in the form of a snackbar.
     * @param {any} param0
     * @param {String} message The message to display.
     */
    displayMessage ({ commit }, message) {
      commit('updateSnackbar', {
        bottom: true,
        message
      })
    },
    /**
     * Displays a success message to the user in the form of a snackbar.
     * @param {any} param0
     * @param {String} message The message to display.
     */
    displaySuccessMessage ({ commit }, message) {
      commit('updateSnackbar', {
        bottom: true,
        message,
        color: 'success'
      })
    }
  }
})
