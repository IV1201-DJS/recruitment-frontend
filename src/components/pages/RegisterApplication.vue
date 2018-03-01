<template>
  <v-container fluid>
    <v-stepper v-model="e6" vertical>
      <v-stepper-step step="1" v-bind:complete="e6 > 1"><span v-t="'competence.competences'" /></v-stepper-step>

      <v-stepper-content step="1">
        <v-card color="grey lighten-4" class="mb-5" flat>
          <competence-listing v-for="competence in competences"
                              :competence="competence"
                              :key="competence.id" />

          <competence-picker />
        </v-card>

        <v-btn color="primary" @click.native="e6 = 2" :disabled="competenceNextDisabled">{{ $t('competence.continue') }}</v-btn>
      </v-stepper-content>

      <v-stepper-step step="2" v-bind:complete="e6 > 2">
        {{ $t('availability.title') }}
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card color="grey lighten-4" class="mb-5 pl-4 pr-4" flat>
          <availability-picker v-on:fromDateChange="fromDateChange($event)"
                               v-on:toDateChange="toDateChange($event)"
                               :initFromDate="$store.state.fromDate"
                               :initToDate="$store.state.toDate" />
        </v-card>

        <v-btn color="primary" @click.native="e6 = 3" :disabled="availableNextDisabled">{{ $t('competence.continue') }}</v-btn>
        <v-btn flat @click.native="e6 = 1">{{ $t('competence.back') }}</v-btn>
      </v-stepper-content>

      <v-stepper-step step="3" v-bind:complete="e6 > 3">
        {{ $t('competence.verifyApplication') }}
      </v-stepper-step>
      <v-stepper-content step="3">
        <application-summary :competences="competences" :fromDate="fromDate" :toDate="toDate" />

        <v-btn color="success" @click="sendApplication" :loading="loading">{{ $t('competence.send')}}</v-btn>
        <v-btn flat @click.native="e6 = 2">{{ $t('competence.back') }}</v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>
<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'

import CompetenceListing from './subpages/CompetenceListing'
import CompetencePicker from './subpages/CompetencePicker'
import AvailabilityPicker from './subpages/AvailabilityPicker'
import ApplicationSummary from './subpages/ApplicationSummary'

export default {
  components: {
    CompetencePicker,
    CompetenceListing,
    AvailabilityPicker,
    ApplicationSummary
  },
  data: () => ({
    competenceNextDisabled: true,
    availableNextDisabled: true,
    e6: 1,
    CurrentUser: {},
    loading: false,
    items: [],
    search: null,
    select: []
  }),
  created () {
    this.competenceNextDisabledFn(this.competences)
    this.availableNextDisabledFn(this.fromDate, this.toDate)
  },
  computed: {
    competencesLocale: () => this.$t('user.competences'),
    ...mapState([
      'competences',
      'fromDate',
      'toDate'
    ])
  },
  watch: {
    competences (newCompetences) {
      this.competenceNextDisabledFn(newCompetences)
    },
    fromDate (newFromDate) {
      this.availableNextDisabledFn(newFromDate, this.toDate)
    },
    toDate (newToDate) {
      this.availableNextDisabledFn(this.toDate, newToDate)
    }
  },
  methods: {
    fromDateChange (newFromDate) {
      this.$store.commit('updateAvailabilityFromDate', newFromDate)
    },
    toDateChange (newToDate) {
      this.$store.commit('updateAvailabilityToDate', newToDate)
    },
    availableNextDisabledFn (fromDate, toDate) {
      this.availableNextDisabled = !fromDate || !toDate
    },
    competenceNextDisabledFn (newCompetences) {
      this.competenceNextDisabled = newCompetences.length === 0
    },
    async sendApplication () {
      this.loading = true

      try {
        await this.$apollo.mutate({
          mutation: gql`mutation ($competences: [CompetenceInput], $availabilities: [AvailabilityInput]) {
            addApplication (competences: $competences, availabilities: $availabilities) {
              user {
                id
              }
            }
          }`,
          variables: {
            competences: this.competences,
            availabilities: {
              from: this.fromDate,
              to: this.toDate
            }
          }
        })

        this.$store.dispatch('displaySuccessMessage', this.$t('validate.success'))
        this.$router.push('/')
      } catch (error) {
        if (error.message === 'GraphQL error: User has a pending application already') {
          this.$store.dispatch('displayError', this.$t('validate.error.pending'))
        } else {
          this.$store.dispatch('displayError', error.message)
          console.dir(error)
        }
      }

      this.loading = false
    }
  }
}
</script>
