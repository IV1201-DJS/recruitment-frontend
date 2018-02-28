<template>
  <v-container fluid>
    <competence-search />

    <availability-picker v-on:fromDateChange="fromDateChange($event)" v-on:toDateChange="toDateChange($event)" />

    <user-application v-for="application in Applications" :user="application.user" :key="application.user.ssn" />
  </v-container>
</template>
<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'

import CompetenceSearch from './subpages/CompetenceSearch'
import UserApplication from './subpages/UserApplication'
import AvailabilityPicker from './subpages/AvailabilityPicker'

export default {
  components: { CompetenceSearch, UserApplication, AvailabilityPicker },
  data: () => ({
    Applications: [],
    fromDate: null,
    toDate: null
  }),
  methods: {
    fromDateChange (newFromDate) {
      this.fromDate = newFromDate
    },
    toDateChange (newToDate) {
      this.toDate = newToDate
    }
  },
  computed: {
    ...mapState([
      'competenceCriteria'
    ]),
    competences: () => {
      if (!this.competenceCriteria) return null
      if (this.competenceCriteria.length === 0) return null

      return this.competenceCriteria
    },
    availability () {
      if (!(this.fromDate && this.toDate)) return null

      return {
        from: this.fromDate,
        to: this.toDate
      }
    }
  },
  apollo: {
    Applications: {
      query: gql`query ($competence_ids: [ID], $searched_availability: AvailabilityInput, $full_name: FullNameInput, $date_of_registration: String) {
        Applications (competence_ids: $competence_ids, searched_availability: $searched_availability, full_name: $full_name, date_of_registration: $date_of_registration) {
          user {
            firstname
            lastname
          }
        }
      }`,
      variables () {
        return {
          competence_ids: this.competences,
          searched_availability: this.availability,
          full_name: null,
          date_of_registration: null
        }
      }
    }
  }
}
</script>
