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

    <v-layout row wrap class="pr-4 pl-4">
      <v-text-field xs12 sm5 :value="fromDate" :label="$t('availability.fromDate')" disabled />

      <v-spacer />

      <v-text-field xs12 sm5 :value="toDate" :label="$t('availability.toDate')" disabled />
    </v-layout>
  </v-card>
</template>
<script>
import CompetenceListing from './CompetenceListing'

export default {
  components: { CompetenceListing },
  props: {
    competences: Array,
    fromDate: String,
    toDate: String
  }
}
</script>
