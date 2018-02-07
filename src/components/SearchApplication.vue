<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-layout>
          <v-flex>
            <v-select
              label="Competences"
              autocomplete
              :loading="loading"
              multiple
              cache-items
              chips
              required
              :items="items"
              :rules="[() => select.length > 0 || 'You must choose at least one competence']"
              :search-input.sync="search"
              v-model="select"
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
import gql from 'graphql-tag'

export default {
  data () {
    return {
      loading: false,
      items: [],
      search: null,
      select: [],
      Competences: [],
      competenceQuery: ''
    }
  },
  watch: {
    search (val) {
      val && this.querySelections(val)
    }
  },
  apollo: {
    Competences: {
      query: gql`query ($name: String!) {
        Competences (name: $name) {
          id
          name
        }
      }`,
      variables () {
        return {
          name: this.competenceQuery
        }
      }
    }
  },
  methods: {
    querySelections (query) {
      this.competenceQuery = query
      this.loading = true

      this.items = this.Competences
        .map(item => item.name)
        .filter(e => {
          return (e || '').toLowerCase().indexOf((query || '').toLowerCase())
        })

      this.loading = false
    }
  }
}
</script>
