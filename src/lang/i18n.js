import Vue from 'vue'
import VueI18n from 'vue-i18n'

import en from './en'
import sv from './sv'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: localStorage.locale,
  fallbackLocale: 'en',
  messages: {
    en,
    sv
  }
})

export default i18n
