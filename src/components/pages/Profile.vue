<template>
  <v-content v-if="CurrentUser" fluid>
    <h1>Username: {{ CurrentUser.username }}</h1>
    <h2>First name: {{ CurrentUser.firstname }}</h2>
    <h2>Last name: {{ CurrentUser.lastname }}</h2>
    <h2>Email: {{ CurrentUser.email }}</h2>
  </v-content>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data: () => ({
    CurrentUser: null
  }),
  apollo: {
    // Query with parameters
    CurrentUser: {
      query: gql`query {
        CurrentUser {
          username
          firstname
          lastname
          email
        }
      }`
    }
  }
}
</script>
