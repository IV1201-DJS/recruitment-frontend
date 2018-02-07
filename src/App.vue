<template>
  <v-app light>
    <navbar />

    <router-view></router-view>
  </v-app>
</template>
<script>
import gql from 'graphql-tag'

import Navbar from './components/common/AppNavbar'

export default {
  components: { Navbar },
  data () {
    return {
      loggedIn: true
    }
  },
  apollo: {
    // Issue a query to check if the user is logged in
    CurrentUser: gql`query CurrentUser {
      CurrentUser {
        username
      }
    }`
  }
}
</script>
<style lang="sass">
</style>
