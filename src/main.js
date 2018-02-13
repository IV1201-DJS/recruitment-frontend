// @ts-check
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import apolloProvider from './apollo'
import i18n from './lang/i18n'

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Default locale
if (!localStorage.locale) {
  localStorage.locale = 'en'
}

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  provide: apolloProvider.provide(),
  components: { App },
  template: '<App/>',
  i18n
})
