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

            <v-toolbar-items>
              <v-btn dark flat @click.native="dialog = false">Save</v-btn>
            </v-toolbar-items>

            <v-menu bottom right offset-y>
              <v-btn slot="activator" dark icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-menu>

          </v-toolbar>
          <v-card-text>
            <v-list three-line subheader>
              <v-subheader>User Controls</v-subheader>

              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Content filtering</v-list-tile-title>
                  <v-list-tile-sub-title>Set the content filtering level to restrict apps that can be downloaded</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Password</v-list-tile-title>
                  <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>

            <v-divider />

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
  watch: {
    language: function (current) {
    }
  },
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
