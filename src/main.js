// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VeeValidate from 'vee-validate'
import messagesSv from 'vee-validate/dist/locale/sv'
import VueI18n from 'vue-i18n'

// Apollo
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import VueApollo from 'vue-apollo'

import App from './App'
import router from './router'
import store from './store'
import messages from './lang/lang'

Vue.config.productionTip = false

// Default locale
if (!localStorage.locale) {
  localStorage.locale = 'en'
}

let httpLink = new HttpLink({
  uri: `${process.env.BACKEND}/graphql`
})

const errorLink = onError(({ networkError }) => {
  if (networkError.statusCode === 401) {
    // The user is not logged in -> update the store
    store.commit('updateLoginStatus', false)
    // Save redirect router path
    const path = router.currentRoute.fullPath
    if (path !== '/login' && path !== '/register') {
      store.commit('updateLoginRedirect', path)
    }

    router.push('/login')
  }
})

const headerLang = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const lang = localStorage.locale
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      locale: lang
    }
  }
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')

  // The user is logged in -> update the store
  if (token) store.commit('updateLoginStatus', true)

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

// Create the apollo client
const defaultClient = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authLink,
    headerLang,
    httpLink
  ]),
  // link: authLink.concat(httpLink, errorLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

let apolloProvider = new VueApollo({
  defaultClient
})

// Install the vue plugin
Vue.use(VueApollo)

Vue.use(Vuetify)
Vue.use(VeeValidate, {
  locale: localStorage.locale,
  dictionary: {
    sv: messagesSv
  }
})
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: localStorage.locale,
  fallbackLocale: 'en',
  messages
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  apolloProvider,
  components: { App },
  template: '<App/>',
  i18n
})
