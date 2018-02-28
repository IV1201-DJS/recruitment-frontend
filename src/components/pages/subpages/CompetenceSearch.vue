<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-select
          :label="$t('competence.competences')"
          autocomplete
          :loading="AllCompetences.loading"
          multiple
          chips
          :items="AllCompetences"
          item-text="name"
          item-value="id"
          v-model="selectedCompetences"
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import gql from 'graphql-tag'

export default {
  data () {
    return {
      AllCompetences: [],
      loading: false,
      items: [],
      search: null,
      selectedCompetences: []
    }
  },
  watch: {
    selectedCompetences (newCompetences) {
      this.$emit('competenceChange', newCompetences)
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
</script>>
