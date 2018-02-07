<template>
  <v-app light>
    <navbar v-if="loggedIn" />

    <router-view />

    <app-footer v-if="loggedIn" />
  </v-app>
</template>
<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'

import Navbar from './components/common/AppNavbar'
import AppFooter from './components/common/AppFooter'

export default {
  components: { Navbar, AppFooter },
  apollo: {
    // Issue a query to check if the user is logged in
    CurrentUser: gql`query CurrentUser {
      CurrentUser {
        username
      }
    }`
  },
  computed: mapState([
    'loggedIn'
  ])
}
</script>
<style lang="sass">
</style>
