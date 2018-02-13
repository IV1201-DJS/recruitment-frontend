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
        <v-list-tile :to="{ name: 'RegisterApplication' }">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{ name: 'RegisterApplication' }">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title><span v-t="'navbar.registerApplication'" /></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{ name: 'Profile' }">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title><span v-t="'navbar.profile'" /></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{ name: 'SearchApplication' }">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title><span v-t="'navbar.applications'" /></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="logout">
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title><span v-t="'navbar.logout'" /></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app>
      <v-toolbar-title v-t="'navbar.brandName'"></v-toolbar-title>

      <v-spacer />

      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up" v-if="loggedIn" />

      <v-toolbar-items class="hidden-sm-and-down" v-if="loggedIn">
        <v-btn flat :to="{ name: 'RegisterApplication' }"><span v-t="'navbar.registerApplication'" /></v-btn>
        <v-btn flat :to="{ name: 'Profile' }"><span v-t="'navbar.profile'" /></v-btn>
        <v-btn flat :to="{ name: 'SearchApplication' }"><span v-t="'navbar.applications'" /></v-btn>
        <v-btn flat @click="logout"><span v-t="'navbar.logout'" /></v-btn>
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
  methods: {
    landingPage () {
      this.$router.push('/')
    },
    logout () {
      localStorage.removeItem('token')
      this.$store.commit('updateLoginStatus', false)
      this.$router.push('/login')
    }
  },
  computed: mapState([
    'loggedIn'
  ])
}
</script>
<style lang="sass" scoped>

.title:hover
  cursor: pointer

</style>
