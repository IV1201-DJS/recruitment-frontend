<template>
  <v-card class="mb-5">
    <v-card-title primary-title>
      <div class="headline" v-t="'competence.competences'" />
    </v-card-title>

    <competence-listing v-for="competence in competences"
                        :editable="false"
                        :competence="competence"
                        :key="competence.id" />

    <v-card-title primary-title>
      <div class="headline" v-t="'availability.title'" />
    </v-card-title>

    <v-layout row
              wrap
              class="pr-4 pl-4"
              v-for="(availability, index) in availabilities"
              :key="index + 'summary'">
      <v-text-field xs12 sm5 :value="availability.from" :label="$t('availability.fromDate')" disabled />

      <v-spacer />

      <v-text-field xs12 sm5 :value="availability.to" :label="$t('availability.toDate')" disabled />
    </v-layout>
  </v-card>
</template>
<script>
import CompetenceListing from './CompetenceListing'

export default {
  components: { CompetenceListing },
  props: {
    competences: Array,
    availabilities: Array
  }
}
</script>
