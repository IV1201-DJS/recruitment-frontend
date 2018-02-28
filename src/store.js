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
    legacyUser: null,
    settingsActive: false,
    competences: [],
    fromDate: null,
    toDate: null
  },
  mutations: {
    /**
     * Updates availability to date.
     *
     * @param {any} state
     * @param {any} toDate
     */
    updateAvailabilityToDate (state, toDate) {
      state.toDate = toDate
    },
    /**
     * Updates availability from date.
     *
     * @param {any} state
     * @param {any} fromDate
     */
    updateAvailabilityFromDate (state, fromDate) {
      state.fromDate = fromDate
    },
    /**
     * Updates if the settings are active or not.
     *
     * @param {*} state
     * @param {*} active
     */
    updateSettingsActive (state, active) {
      state.settingsActive = active
    },
    /**
     * Updates the information about the legacy user.
     *
     * @param {*} state
     * @param {*} legacyUser
     */
    updateLegacyUser (state, legacyUser) {
      state.legacyUser = legacyUser
    },
    /**
     * Updates the login status of the current user.
     *
     * @param {*} state
     * @param {*} loggedIn
     */
    updateLoginStatus (state, loggedIn) {
      state.loggedIn = loggedIn
    },
    /**
     * Updates the page to redirect the user when they log in.
     *
     * @param {*} state
     * @param {*} loginRedirect
     */
    updateLoginRedirect (state, loginRedirect) {
      state.loginRedirect = loginRedirect
    },
    /**
     * Adds the provided competence.
     *
     * @param {*} state
     * @param {Object} competence
     * @param {String} competence.id
     * @param {Number} competence.experience_years
     */
    addCompetence (state, competence) {
      state.competences = [...state.competences, competence]
    },
    /**
     * Updates the provided competence experience.
     *
     * @param {any} state
     * @param {Object} competence
     * @param {String} competence.id
     * @param {Number} competence.experience_years
     */
    updateCompetenceExperience (state, competence) {
      const competences = [...state.competences]
      const index = competences.findIndex(cmp => cmp.id === competence.id)
      competences[index] = competence

      state.competences = competences
    },
    /**
     * Removes the provided competence.
     *
     * @param {*} state
     * @param {Object} competence
     * @param {String} competence.id
     * @param {Number} competence.experience_years
     */
    removeCompetence (state, competence) {
      state.competences = state.competences.filter(cComp => cComp.id !== competence.id)
    },
    /**
     * Updates the information about the active snackbar.
     *
     * @param {*} state
     * @param {*} update
     */
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
    updateCompetenceExperience ({ commit }, competence) {
      if (!competence) return

      commit('updateCompetenceExperience', competence)
    },
    /**
     * Removes a competence if it exists.
     *
     * @param {any} { commit }
     * @param {Object} competence
     * @param {String} competence.id
     * @param {Number} competence.experience_years
     */
    removeCompetence ({ commit, state }, competence) {
      if (!competence) return

      commit('removeCompetence', competence)
    },
    /**
     * Adds a competence if it does not already exist.
     *
     * @param {any} { commit }
     * @param {Object} competence
     * @param {String} competence.id
     * @param {Number} competence.experience_years
     */
    addCompetence ({ commit, state }, competence) {
      if (!competence || !competence.id) return

      // Don't add the item if id does not exist
      if (state.competences.find(cComp => cComp.id === competence.id)) return

      commit('addCompetence', competence)
    },
    /**
     * Tries to authenticate the user using the provided credentials.
     *
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
     *
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
     *
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
     *
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
     *
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
