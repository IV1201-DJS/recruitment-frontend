<template>
  <v-container fluid v-if="!$apollo.loading">
    <v-layout row wrap>
      <v-flex sm1 v-if="editable">
        <v-btn color="error" @click="removeCompetence">X</v-btn>
      </v-flex>

      <v-spacer v-if="editable" />

      <v-flex xs12 sm6>
        <v-text-field
          :value="findCompetence(competence.id).name"
          :label="$t('competence.competence')"
          disabled
        />
      </v-flex>

      <v-spacer />

      <v-flex xs12 sm3>
        <v-text-field
          v-model="experience_years"
          :label="$t('competence.experience')"
          type="number"
          max=100
          min=0.1
          step=0.1
          :suffix="$t('competence.years')"
          :disabled="!editable"
          id="experience_years"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import gql from 'graphql-tag'

export default {
  props: {
    editable: {
      type: Boolean,
      default: true
    },
    competence: {
      id: {
        type: String,
        required: true
      },
      experience_years: Number
    }
  },
  created () {
    this.experience = this.competence.experience_years || 0.1
  },
  data: () => ({
    experience_years: 0.1,
    AllCompetences: []
  }),
  watch: {
    competence (newCompetence) {
      if (!this.editable) {
        this.experience_years = newCompetence.experience_years
      }
    },
    async experience_years (newExperience) {
      if (newExperience > 100) newExperience = 100
      else if (newExperience < 0.1) newExperience = 0.1

      this.$store.dispatch('updateCompetenceExperience', {
        id: this.competence.id,
        experience_years: newExperience
      })

      await this.$nextTick()

      this.experience_years = newExperience
    }
  },
  methods: {
    removeCompetence () {
      this.$store.dispatch('removeCompetence', this.competence)
    },
    findCompetence (id) {
      return this.AllCompetences.find(competence => competence.id === id)
    }
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
