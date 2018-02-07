<template>
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
      <v-card flat>
        <v-card-text>
          <v-container fluid>
            <v-layout>
              <v-flex>
                <v-select
                  :label="competencesLocale"
                  autocomplete
                  :loading="loading"
                  multiple
                  cache-items
                  chips
                  required
                  :items="items"
                  :rules="[() => select.length > 0 || 'You must choose at least one competence']"
                  :search-input.sync="search"
                  v-model="select"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
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
</template>
<script>
import gql from 'graphql-tag'

export default {
  data () {
    return {
      e6: 1,
      CurrentUser: {},
      loading: false,
      items: [],
      search: null,
      select: [],
      Competences: [],
      competenceQuery: ''
    }
  },
  apollo: {
    Competences: {
      query: gql`query ($name: String!) {
        Competences (name: $name) {
          id
          name
        }
      }`,
      variables () {
        return {
          name: this.competenceQuery
        }
      }
    },
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
  },
  methods: {
    querySelections (query) {
      this.competenceQuery = query
      this.loading = true

      this.items = this.Competences
        .map(item => item.name)
        .filter(e => {
          return (e || '').toLowerCase().indexOf((query || '').toLowerCase())
        })

      console.log(this.items.length)

      this.loading = false
    }
  }
}
</script>
