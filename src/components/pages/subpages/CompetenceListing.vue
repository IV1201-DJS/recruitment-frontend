<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex sm1>
        <v-btn color="error" @click="removeCompetence">X</v-btn>
      </v-flex>

      <v-spacer />

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
          v-model="experience"
          :label="$t('competence.experience')"
          type="number"
          max=100
          min=0.1
          step=0.1
          :suffix="$t('competence.years')"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import gql from 'graphql-tag'

export default {
  props: {
    competence: {
      id: {
        type: String,
        required: true
      }
    }
  },
  data: () => ({
    experience: 0.1
  }),
  watch: {
    async experience (newExperience) {
      if (newExperience > 100) newExperience = 100
      else if (newExperience < 0.1) newExperience = 0.1

      this.$store.dispatch('updateCompetenceExperience', {
        id: this.competence,
        experience: newExperience
      })

      await this.$nextTick()

      this.experience = newExperience
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
