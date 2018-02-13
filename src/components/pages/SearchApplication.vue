<template>
  <v-content>
    <competence-search />

    <user-application v-for="(user, key) in Applications" :user="user" :key="key" />
  </v-content>
</template>
<script>
import gql from 'graphql-tag'

import CompetenceSearch from './subpages/CompetenceSearch'
import UserApplication from './subpages/UserApplication'

export default {
  components: { CompetenceSearch, UserApplication },
  data () {
    return {
      competences: [''],
      Applications: []
    }
  },
  created () {
    this.$on('updateCriteria', (competences) => {
      this.competences = competences
    })
  },
  apollo: {
    Applications: {
      query: gql`query ($competence_name: String!) {
        Applications (competence_name: $competence_name) {
          firstname
          lastname
          email
          ssn
          competences {
            name
            experience_years
          }
        }
      }`,
      variables () {
        return {
          competence_name: this.competences[0]
        }
      }
    }
  }
}
</script>
