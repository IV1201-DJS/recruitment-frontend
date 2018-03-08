<template>
  <v-container fluid v-if="!$apollo.loading">
    <v-card class="mb-5">
      <v-card-title primary-title>
        <div class="headline" id="applicant">{{ $t('userApplication.applicant') }}: {{ Application.user.firstname }} {{ Application.user.lastname }}</div>

        <v-spacer />

        <div class="headline mr-3">{{ $t('userApplication.status') }}:</div>

        <v-select
          :items="AllApplicationStatuses"
          item-text="name"
          item-value="id"
          v-model="currentStatus"
          :label="$t('userApplication.changeStatus')"
          :disabled="statusDisabled"
        />
      </v-card-title>
    </v-card>

    <application-summary :competences="Application.user.competences"
                         :availabilities="this.Application.user.availabilities" />

    <v-btn @click="createPdf" color="success" id="createPDF">{{ $t('userApplication.generatePDF') }}</v-btn>
  </v-container>
</template>
<script>
import gql from 'graphql-tag'
import JsPDF from 'jspdf'

import ApplicationSummary from './subpages/ApplicationSummary'

export default {
  components: { ApplicationSummary },
  data: () => ({
    Application: {},
    AllApplicationStatuses: [],
    currentStatus: -1
  }),
  computed: {
    applicationId () {
      return this.$route.params.id
    },
    statusDisabled () {
      return this.currentStatus !== -1
    }
  },
  watch: {
    AllApplicationStatuses (newApplicationStatus) {
      this.ApplicationStatuses = newApplicationStatus.map(status => ({
        id: status.id,
        name: status.name
      }))
    },
    Application (newApplication) {
      if (!newApplication.status) return

      this.currentStatus = newApplication.status.id
    },
    currentStatus (newStatus, oldStatus) {
      if (!newStatus) return

      this.updateApplicationStatus(newStatus)
    }
  },
  methods: {
    createPdf () {
      const doc = new JsPDF({
        unit: 'cm'
      })

      const firstName = this.Application.user.firstname
      const lastName = this.Application.user.lastname
      const fullName = `${firstName} ${lastName}`
      const applicant = this.$t('userApplication.applicant')
      doc.text(`${applicant}: ${fullName}`, 1, 1)

      const competencesText = this.$t('competence.competences')
      doc.text(`${competencesText}:`, 1, 2)
      const experienceText = this.$t('competence.experience')
      const yearsText = this.$t('competence.years')
      doc.text(`${experienceText}:`, 10, 2)

      let i = 3
      for (let competence of this.Application.user.competences) {
        doc.text(`${competence.name}`, 1, i)
        doc.text(`${competence.experience_years} ${yearsText}`, 10, i++)
      }

      const availabilityText = this.$t('availability.title')
      const fromText = this.$t('availability.fromDate')
      const toText = this.$t('availability.toDate')

      doc.text(`${availabilityText}:`, 1, i++)

      for (let availability of this.Application.user.availabilities) {
        doc.text(`${fromText}: ${availability.from}`, 1, i)
        doc.text(`${toText}: ${availability.to}`, 10, i++)
      }

      doc.save(`${firstName}-${lastName}-${applicant}.pdf`)
    },
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
      } catch (error) {
        error.graphQLErrors.forEach(error => {
          this.$store.dispatch('displayError', this.$t(`error.${error.message}`))
        })
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
              name
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
