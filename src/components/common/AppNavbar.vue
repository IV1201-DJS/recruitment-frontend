<template>
  <v-layout>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      right
      class="hidden-md-and-up"
      v-if="loggedIn"
    >
      <v-list dense>
        <v-list-tile :to="{ name: 'Home' }" exact>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ $t('navbar.home') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="isApplicant" :to="{ name: 'RegisterApplication' }">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ $t('navbar.registerApplication') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="isRecruiter" :to="{ name: 'SearchApplication' }">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ $t('navbar.applications') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="settings">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ $t('navbar.settings') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ $t('navbar.logout') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app dark color="primary">
      <v-toolbar-title v-t="'navbar.brandName'" />

      <v-spacer />

      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up" v-if="loggedIn" />

      <v-toolbar-items class="hidden-sm-and-down" v-if="loggedIn">
        <v-btn flat :to="{ name: 'Home' }" exact><span v-t="'navbar.home'" /></v-btn>

        <v-btn flat v-if="isApplicant" :to="{ name: 'RegisterApplication' }" id="registerApplicationButton">{{ $t('navbar.registerApplication') }}</v-btn>

        <v-btn flat v-if="isRecruiter" :to="{ name: 'SearchApplication' }" id="searchApplicationButton">{{ $t('navbar.applications') }}</v-btn>

        <v-btn flat @click="settings" id="settingsButton">{{ $t('navbar.settings') }}</v-btn>

        <v-btn flat @click="logout" id="logoutButton">{{ $t('navbar.logout') }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-layout>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    drawer: null
  }),
  computed: {
    ...mapState([
      'loggedIn',
      'role'
    ]),
    isRecruiter () {
      return this.role >= 2
    },
    isApplicant () {
      return this.role === 1
    }
  },
  methods: {
    landingPage () {
      this.$router.push('/')
    },
    logout () {
      localStorage.removeItem('token')
      this.$store.commit('updateLoginStatus', false)
      this.$router.push('/login')
    },
    settings () {
      this.$store.commit('updateSettingsActive', true)
    }
  }
}
</script>
<style lang="sass" scoped>

.title:hover
  cursor: pointer

</style>
