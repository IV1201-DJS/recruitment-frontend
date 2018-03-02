<template>
  <v-container fluid>
    <competence-search v-on:competenceChange="competenceChange($event)" />

    <availability-picker v-on:fromDateChange="fromDateChange($event)"
                         v-on:toDateChange="toDateChange($event)" />

    <date-picker :label="$t('userApplication.dateOfRegistration')"
                 v-on:dateChange="regDateChange($event)"/>

    <v-text-field
      :label="$t('user.name')"
      v-model="name"
    />

    <user-application v-for="application in Applications.data"
                      :application="application"
                      :key="application.id" />

    <v-layout justify-center>
      <v-flex xs8>
        <v-card>
          <v-card-text>
            <v-pagination :length="Applications.lastPage" v-model="page" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import gql from 'graphql-tag'

import CompetenceSearch from './subpages/CompetenceSearch'
import UserApplication from './subpages/UserApplication'
import AvailabilityPicker from './subpages/AvailabilityPicker'
import DatePicker from './subpages/DatePicker'

export default {
  components: {
    CompetenceSearch,
    UserApplication,
    AvailabilityPicker,
    DatePicker
  },
  data: () => ({
    Applications: {
      lastPage: 1,
      page: 1
    },
    fromDate: null,
    toDate: null,
    dateOfRegistration: null,
    competenceCriteria: [],
    name: '',
    page: 1
  }),
  methods: {
    competenceChange (updatedCompetences) {
      this.competenceCriteria = updatedCompetences
    },
    fromDateChange (newFromDate) {
      this.fromDate = newFromDate
    },
    toDateChange (newToDate) {
      this.toDate = newToDate
    },
    regDateChange (newDate) {
      this.dateOfRegistration = newDate
    }
  },
  watch: {
    Applications (newApplications) {
      this.page = newApplications.page
    }
  },
  computed: {
    competences () {
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
      query: gql`query ($competence_ids: [ID], $searched_availability: AvailabilityInput, $name: String, $date_of_registration: String, $page: Int!, $page_size: Int!) {
        Applications (competence_ids: $competence_ids, searched_availability: $searched_availability, name: $name, date_of_registration: $date_of_registration, page: $page, page_size: $page_size) {
          lastPage
          page
          data {
            id
            user {
              firstname
              lastname
            }
            date_of_registration
          }
        }
      }`,
      variables () {
        return {
          competence_ids: this.competences,
          searched_availability: this.availability,
          name: this.name,
          date_of_registration: this.dateOfRegistration,
          page: this.page,
          page_size: 10
        }
      },
      fetchPolicy: 'cache-and-network'
    }
  }
}
</script>
