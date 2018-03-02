<template>
  <v-container fluid v-if="!$apollo.loading">
    <v-card class="mb-5">
      <v-card-title primary-title>
        <div class="headline">{{ $t('userApplication.applicant') }}: {{ Application.user.firstname }} {{ Application.user.lastname }}</div>

        <v-spacer />

        <div class="headline">{{ $t('userApplication.status') }}: {{ Application.status.name }}</div>
      </v-card-title>
    </v-card>

    <application-summary :competences="Application.user.competences"
                         :availabilities="this.Application.user.availabilities" />
  </v-container>
</template>
<script>
import gql from 'graphql-tag'

import ApplicationSummary from './subpages/ApplicationSummary'

export default {
  components: { ApplicationSummary },
  data: () => ({
    Application: {}
  }),
  apollo: {
    Application: {
      query: gql`query ($id: ID!) {
        Application (id: $id) {
          status {
            name
          }
          user {
            firstname
            lastname
            availabilities {
              from
              to
            }
            competences {
              id
              experience_years
            }
          }
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
