<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-select
          :items="filteredCompetences"
          item-text="name"
          item-value="id"
          v-model="competence"
          :label="$t('competence.competence')"
          autocomplete
          @change="competenceChange"
          ref="competenceSelect"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'

export default {
  data: () => ({
    competence: null,
    experience_years: 0.1,
    AllCompetences: []
  }),
  methods: {
    async competenceChange () {
      // Wait for the competence to become available
      await this.$nextTick()

      this.$store.dispatch('addCompetence', {
        id: this.competence,
        experience_years: this.experience_years
      })

      // RESET SELECT
      this.competence = null
      this.experience_years = 0.1

      this.$refs.competenceSelect.blur()
    },
    removeCompetence () {
      this.$store.dispatch('removeCompetence', this.competence)
    }
  },
  computed: {
    filteredCompetences () {
      const pickedCompetences = new Set(this.competences.map(competence => competence.id))
      const isInStore = ({ id }) => !pickedCompetences.has(id)

      return this.AllCompetences.filter(comp => isInStore(comp))
    },
    ...mapState([
      'competences'
    ])
  },
  apollo: {
    AllCompetences: {
      query: gql`query {
        AllCompetences {
          id
          name
        }
      }`
    }
  }
}
</script>
