<template>
  <v-app light>
    <navbar v-if="loggedIn" />

    <router-view />
  </v-app>
</template>
<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'

import Navbar from './components/common/AppNavbar'

export default {
  components: { Navbar },
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
