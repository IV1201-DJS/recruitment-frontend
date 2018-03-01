<template>
  <v-container fluid>
    <h1>{{ $t('userApplication.applicant') }}: {{ User.firstname }} {{ User.lastname }}</h1>
    <h2>{{ $t('userApplication.status') }}: NOT IMPLEMENTED</h2>
  </v-container>
</template>
<script>
import gql from 'graphql-tag'

import ApplicationSummary from './subpages/ApplicationSummary'

export default {
  components: { ApplicationSummary },
  data: () => ({
    User: {}
  }),
  apollo: {
    User: {
      query: gql`query ($id: ID!) {
        User (id: $id) {
          firstname
          lastname
        }
      }`,
      variables () {
        return {
          id: this.$route.params.id
        }
      }
    }
  }
}
</script>
