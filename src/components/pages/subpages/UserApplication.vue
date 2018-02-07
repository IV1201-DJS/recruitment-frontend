<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="cyan darken-2" class="white--text" ripple raised>
          <v-card-title primary-title>
            <div class="headline">{{ user.firstname }} {{ user.lastname }}</div>
          </v-card-title>

          <v-card-text>
            <h3>email: {{ user.email }}</h3>
            <h3>ssn: {{ user.username }}</h3>

            <h3>Competences:</h3>
            <v-list two-line>
              <template v-for="(competence, key) in user.competences">
                <v-list-tile :key="key">
                  <v-list-tile-content>
                    <v-list-tile-sub-title>Competence: {{ competence.name }}</v-list-tile-sub-title>
                    <v-list-tile-sub-title>Years of experience: {{ competence.experience_years }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>

          </v-card-text>

          <v-card-actions>
            <v-btn flat dark>See more</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: {
    user: {
      firstName: String,
      lastName: String,
      ssn: String,
      email: String,
      competences: [{
        name: String
      }]
    }
  }
}
</script>
