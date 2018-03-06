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
          <v-layout v-for="(availability, index) in availabilities" :key="availability.id">
            <v-btn color="error"
                   @click="removeDateInterval(index)"
                   v-if="availability.from && availability.to">X</v-btn>

            <availability-picker v-on:fromDateChange="fromDateChange($event, index)"
                                 v-on:toDateChange="toDateChange($event, index)"
                                 :initFromDate="availability.from"
                                 :initToDate="availability.to" />
          </v-layout>
        </v-card>

        <v-btn color="primary" @click.native="e6 = 3" :disabled="availableNextDisabled">{{ $t('competence.continue') }}</v-btn>
        <v-btn flat @click.native="e6 = 1">{{ $t('competence.back') }}</v-btn>
      </v-stepper-content>

      <v-stepper-step step="3" v-bind:complete="e6 > 3">
        {{ $t('competence.verifyApplication') }}
      </v-stepper-step>
      <v-stepper-content step="3">
        <application-summary :competences="competences" :availabilities="availabilitiesWithoutPicker" />

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
    select: [],
    uuid: 0,
    availabilities: [{
      from: '',
      to: '',
      id: this.uuid
    }]
  }),
  created () {
    this.competenceNextDisabledFn(this.competences)
  },
  computed: {
    ...mapState([
      'competences'
    ]),
    availabilitiesWithoutPicker () {
      return this.availabilities.filter(av => av.from && av.to)
    }
  },
  watch: {
    competences (newCompetences) {
      this.competenceNextDisabledFn(newCompetences)
    }
  },
  methods: {
    fromDateChange (newFromDate, index) {
      this.availabilities[index].from = newFromDate
      this.addNewDatePicker(index)
    },
    toDateChange (newToDate, index) {
      this.availabilities[index].to = newToDate
      this.addNewDatePicker(index)
    },
    removeDateInterval (index) {
      this.availabilities.splice(index, 1)

      if (this.availabilities.length < 2) this.availableNextDisabled = true
    },
    addNewDatePicker (index) {
      const availability = this.availabilities[this.availabilities.length - 1]

      if (availability.from && availability.to) {
        this.availabilities.push({
          from: '',
          to: '',
          id: ++this.uuid
        })
      }

      if (this.availabilities.length > 1) this.availableNextDisabled = false
    },
    competenceNextDisabledFn (newCompetences) {
      this.competenceNextDisabled = newCompetences.length === 0
    },
    async sendApplication () {
      this.loading = true

      try {
        await this.$apollo.mutate({
          mutation: gql`mutation ($competences: [CompetenceInput]!, $availabilities: [AvailabilityInput]!) {
            addApplication (competences: $competences, availabilities: $availabilities) {
              user {
                id
              }
            }
          }`,
          variables: {
            competences: this.competences,
            availabilities: this.availabilities.map(av => ({
              from: av.from,
              to: av.to
            }))
          }
        })

        this.$store.dispatch('displaySuccessMessage', this.$t('validate.success'))
        this.$router.push('/')
      } catch (error) {
        if (error.message === 'GraphQL error: PENDING_APPLICATION_EXISTS') {
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
