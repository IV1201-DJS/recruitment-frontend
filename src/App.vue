<template>
  <v-app light>
    <navbar v-if="loggedIn" />

    <router-view></router-view>
  </v-app>
</template>
<script>
import gql from 'graphql-tag'

import Navbar from './components/Navbar'

export default {
  components: { Navbar },
  data () {
    return {
      loggedIn: true
    }
  },
  apollo: {
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
