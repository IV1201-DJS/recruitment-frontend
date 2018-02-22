<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex sm1>
        <v-btn color="error" @click="removeCompetence" v-if="competence">X</v-btn>
      </v-flex>

      <v-flex xs12 sm6 offset-sm1>
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

      <v-flex xs12 sm3 offset-sm1>
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
import { mapState } from 'vuex'

export default {
  created () {
    this.competence = this.initCompetence
  },
  props: {
    initCompetence: String,
    initial: {
      default: false,
      type: Boolean
    }
  },
  data: () => ({
    competence: null,
    experience: 0.1,
    AllCompetences: []
  }),
  watch: {
    competence: function (newCompetence, oldCompetence) {
      if (!this.initial) {
        this.$store.dispatch('removeCompetence', oldCompetence)
        this.$store.dispatch('addCompetence', newCompetence)
      }
    }
  },
  methods: {
    async competenceChange () {
      if (this.initial) {
        await this.$nextTick()
        this.$store.dispatch('addCompetence', this.competence)
        this.competence = null
        this.$refs.competenceSelect.blur()
      }
    },
    removeCompetence () {
      this.$store.dispatch('removeCompetence', this.competence)
    }
  },
  computed: {
    filteredCompetences () {
      const isCurrentCompetence = (cComp) => cComp.id === this.competence
      const isInStore = (cComp) => this.competences.includes(cComp.id)

      return this.AllCompetences.filter(comp => isCurrentCompetence(comp) || !isInStore(comp))
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
