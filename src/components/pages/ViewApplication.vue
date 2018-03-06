<template>
  <v-container fluid v-if="!$apollo.loading">
    <v-card class="mb-5">
      <v-card-title primary-title>
        <div class="headline">{{ $t('userApplication.applicant') }}: {{ Application.user.firstname }} {{ Application.user.lastname }}</div>

        <v-spacer />

        <div class="headline mr-3">{{ $t('userApplication.status') }}:</div>

        <v-select
          :items="AllApplicationStatuses"
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
    AllApplicationStatuses: [],
    currentStatus: 1
  }),
  computed: {
    applicationId () {
      return this.$route.params.id
    }
  },
  watch: {
    Application (newApplication) {
      if (!newApplication.status) return

      this.currentStatus = newApplication.status.id
    },
    currentStatus (newStatus) {
      if (!newStatus) return

      this.updateApplicationStatus(newStatus)
    }
  },
  methods: {
    async updateApplicationStatus (newStatus) {
      try {
        await this.$apollo.mutate({
          mutation: gql`mutation ($application_id: ID!, $new_status: ID!) {
            updateApplicationStatus (application_id: $application_id, new_status: $new_status) {
              id
            }
          }`,
          variables: {
            application_id: this.applicationId,
            new_status: newStatus
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
  },
  apollo: {
    AllApplicationStatuses: {
      query: gql`query {
        AllApplicationStatuses {
          id
          name
        }
      }`
    },
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
