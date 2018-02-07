<template>
  <v-container>
    <v-stepper v-model="e6" vertical>
      <v-stepper-step step="1" v-bind:complete="e6 > 1">
        Validate personal information
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card color="grey lighten-4" flat>
          <v-card-text>
            <v-container fluid>
              <v-text-field
                label="Username"
                :value="CurrentUser.username"
                disabled
              />

              <v-text-field
                label="First name"
                :value="CurrentUser.firstname"
                disabled
              />

              <v-text-field
                label="Last name"
                :value="CurrentUser.lastname"
                disabled
              />

              <v-text-field
                label="Email"
                :value="CurrentUser.email"
                disabled
              />

              <v-text-field
                label="SSN"
                :value="CurrentUser.ssn"
                disabled
              />
            </v-container>
          </v-card-text>
        </v-card>

        <v-btn color="primary" @click.native="e6 = 2">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step step="2" v-bind:complete="e6 > 2">Competences</v-stepper-step>

      <v-stepper-content step="2">
        <competence-search />

        <v-btn color="primary" @click.native="e6 = 3">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step step="3" v-bind:complete="e6 > 3">Availability</v-stepper-step>
      <v-stepper-content step="3">
        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
        <v-btn color="primary" @click.native="e6 = 4">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>
<script>
import gql from 'graphql-tag'

import CompetenceSearch from './subpages/CompetenceSearch'

export default {
  components: { CompetenceSearch },
  data () {
    return {
      e6: 1,
      CurrentUser: {},
      loading: false,
      items: [],
      search: null,
      select: []
    }
  },
  apollo: {
    CurrentUser: {
      query: gql`query {
        CurrentUser {
          username
          firstname
          lastname
          ssn
          email
        }
      }`,
      variables () {
        return {
          id: this.userId
        }
      }
    }
  },
  computed: {
    competencesLocale () {
      return this.$t('user.competences')
    }
  },
  watch: {
    search (val) {
      val && this.querySelections(val)
    }
  }
}
</script>
