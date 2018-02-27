<template>
  <v-container fluid>
    <v-stepper v-model="e6" vertical>
      <v-stepper-step step="1" v-bind:complete="e6 > 1"><span v-t="'competence.competences'" /></v-stepper-step>

      <v-stepper-content step="1">
        <v-card color="grey lighten-4" class="mb-5" flat>
          <competence-listing v-for="competence in competences" :competence="competence" :key="competence.id" />

          <competence-picker />
        </v-card>

        <v-btn color="primary" @click.native="e6 = 2"><span v-t="'competence.continue'" /></v-btn>
      </v-stepper-content>

      <v-stepper-step step="2" v-bind:complete="e6 > 2"><span v-t="'availability.title'" /></v-stepper-step>

      <v-stepper-content step="2">
        <v-card color="grey lighten-4" class="mb-5 pl-4 pr-4" flat>
          <availability-picker />
        </v-card>

        <v-btn color="primary" @click.native="e6 = 3"><span v-t="'competence.continue'" /></v-btn>
        <v-btn flat @click.native="e6 = 1"><span v-t="'competence.back'" /></v-btn>
      </v-stepper-content>

      <v-stepper-step step="3" v-bind:complete="e6 > 3"><span v-t="'competence.verifyApplication'" /></v-stepper-step>
      <v-stepper-content step="3">
        <v-card class="mb-5">
          <v-card-title primary-title>
            <div class="headline" v-t="'competence.competences'" />
          </v-card-title>

          <competence-listing v-for="competence in competences" :editable="false" :competence="competence" :key="competence.id" />

          <v-card-title primary-title>
            <div class="headline" v-t="'availability.title'" />
          </v-card-title>

          <v-layout row wrap class="pr-4 pl-4">
            <v-text-field xs12 sm5 :value="fromDate" :label="$t('availability.fromDate')" disabled />

            <v-spacer />

            <v-text-field xs12 sm5 :value="toDate" :label="$t('availability.toDate')" disabled />
          </v-layout>
        </v-card>

        <v-btn color="success"><span v-t="'competence.send'" /></v-btn>
        <v-btn flat @click.native="e6 = 2"><span v-t="'competence.back'" /></v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'

import CompetenceListing from './subpages/CompetenceListing'
import CompetencePicker from './subpages/CompetencePicker'
import AvailabilityPicker from './subpages/AvailabilityPicker'

export default {
  components: {
    CompetencePicker,
    CompetenceListing,
    AvailabilityPicker
  },
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
  computed: {
    competencesLocale () {
      return this.$t('user.competences')
    },
    ...mapState([
      'competences',
      'fromDate',
      'toDate'
    ])
  }
}
</script>
