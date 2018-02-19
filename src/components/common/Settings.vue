<template>
  <div>
    <v-layout row justify-center>
      <v-dialog
        v-model="settingsActive"
        fullscreen
        transition="dialog-bottom-transition"
        :overlay="false"
        scrollable
      >
        <v-card tile>
          <v-toolbar card dark color="primary">
            <v-btn icon @click="closeSettings" dark>
              <v-icon>close</v-icon>
            </v-btn>

            <v-toolbar-title v-t="'settings.title'" />

            <v-spacer />
          </v-toolbar>
          <v-card-text>
            <v-list three-line subheader>
              <v-subheader v-t="'settings.general'" />

              <v-list-tile>
                <v-list-tile-action>
                  <v-select
                    v-model="language"
                    @change="changeLanguage"
                    :items="languages"
                  />
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title v-t="'settings.locale.title'" />
                  <v-list-tile-sub-title v-t="'settings.locale.subtitle'"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  created () {
    const locale = localStorage.getItem('locale') || 'en'
    const localeObj = this.localesAndLocale.find(cLocale => cLocale.locale === locale) || this.localesAndLocale[0]

    this.languages = this.localesAndLocale.map(locale => locale.language)
    this.language = localeObj.language
  },
  data: () => ({
    CurrentUser: {},
    localesAndLocale: [
      {
        locale: 'en',
        language: 'English'
      },
      {
        locale: 'sv',
        language: 'Svenska'
      }
    ],
    language: '',
    languages: []
  }),
  methods: {
    closeSettings () {
      this.$store.commit('updateSettingsActive', false)
    },
    changeLanguage (current) {
      const { locale } = this.localesAndLocale.find(locale => locale.language === current)
      localStorage.setItem('locale', locale)

      location.reload()
    }
  },
  computed: {
    ...mapState([
      'settingsActive'
    ])
  }
}
</script>
