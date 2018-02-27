<template>
  <v-container fluid>
    <competence-search />

    <user-application v-for="application in Applications" :user="application.user" :key="application.user.ssn" />
  </v-container>
</template>
<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'

import CompetenceSearch from './subpages/CompetenceSearch'
import UserApplication from './subpages/UserApplication'

export default {
  components: { CompetenceSearch, UserApplication },
  data () {
    return {
      Applications: []
    }
  },
  computed: mapState([
    'competenceCriteria'
  ]),
  apollo: {
    Applications: {
      query: gql`query ($competence_ids: [ID], $searched_availability: AvailabilityInput, $full_name: FullNameInput, $date_of_registration: String) {
        Applications (competence_ids: $competence_ids, searched_availability: $searched_availability, full_name: $full_name, date_of_registration: $date_of_registration) {
          user {
            firstname
            lastname
            email
            ssn
            competences {
              name
              experience_years
            }
          }
        }
      }`,
      variables () {
        return {
          competence_ids: this.competenceCriteria.length > 0 ? this.competenceCriteria : null,
          searched_availability: null,
          full_name: null,
          date_of_registration: null
        }
      }
    }
  }
}
</script>
