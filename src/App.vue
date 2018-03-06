<template>
  <v-app id="inspire">
    <navbar />

    <v-container fluid mt-5>
      <v-layout justify-center align-center>
        <router-view />
      </v-layout>
    </v-container>

    <app-footer />

    <v-snackbar
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :top="snackbar.top"
      :bottom="snackbar.bottom"
      :right="snackbar.right"
      :left="snackbar.left"
      v-model="snackbar.visible"
    >{{ snackbar.message }}</v-snackbar>

    <settings />
  </v-app>
</template>

<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'

import Navbar from '@/components/common/AppNavbar'
import AppFooter from '@/components/common/AppFooter'
import Settings from '@/components/common/Settings'

export default {
  components: { Navbar, AppFooter, Settings },
  watch: {
    loggedIn (loginStatus) {
      this.$apollo.queries.CurrentUser.refresh()
    }
  },
  apollo: {
    // Issue a query to check if the user is logged in
    CurrentUser: {
      query: gql`query {
        CurrentUser {
          role {
            id
          }
        }
      }`,
      fetchPolicy: 'cache-and-network',
      result ({ data }) {
        this.$store.commit('updateRole', data.CurrentUser.role)
      }
    }
  },
  computed: mapState([
    'loggedIn',
    'snackbar'
  ])
}
</script>
