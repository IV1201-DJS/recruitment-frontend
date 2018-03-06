<template>
  <v-container fluid v-if="!$apollo.loading">
    <v-card class="mb-5">
      <v-card-title primary-title>
        <div class="headline">{{ $t('userApplication.applicant') }}: {{ Application.user.firstname }} {{ Application.user.lastname }}</div>

        <v-spacer />

        <div class="headline mr-3">{{ $t('userApplication.status') }}:</div>

        <v-select
          :items="statuses"
          item-text="name"
          item-value="id"
          v-model="currentStatus"
          :label="$t('userApplication.changeStatus')"
        />
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
    Application: {},
    statuses: [],
    currentStatus: 1
  }),
  computed: {
    applicationId () {
      return this.$route.params.id
    }
  },
  watch: {
    Application (newApplication) {
      this.currentStatus = newApplication.status.id
    }
  },
  methods: {
    async updateApplicationStatus () {
      try {
        await this.$apollo.mutate({
          mutation: gql`mutation ($application_id: ID!, $new_status: ID!) {
            updateApplicationStatus (application_id: $application_id, new_status: $new_status) {
              id
            }
          }`,
          variables: {
            application_id: this.applicationId
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
  },
  apollo: {
    Application: {
      query: gql`query ($id: ID!) {
        Application (id: $id) {
          status {
            id
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
          id: this.applicationId
        }
      }
    }
  }
}
</script>
