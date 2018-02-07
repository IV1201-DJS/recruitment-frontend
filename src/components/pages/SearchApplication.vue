<template>
  <v-container fluid>
    <competence-search />

    <div>
    </div>
  </v-container>
</template>
<script>
import CompetenceSearch from './subpages/CompetenceSearch'

export default {
  components: { CompetenceSearch },
  data () {
    return {
      users: []
    }
  },
  created () {
    this.$on('updateCriteria', (competences) => {
      console.log('criteria updated')
      console.log(competences)
    })
  }
}
</script>
