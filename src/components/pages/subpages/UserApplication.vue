<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="cyan darken-3" class="white--text" ripple raised>
          <v-card-title primary-title>
            <div class="headline">{{ user.firstname }} {{ user.lastname }}</div>
          </v-card-title>

          <v-card-text>
            <h3>{{ $t('userApplication.dateOfRegistration') }}: {{ user.ssn }}</h3>
          </v-card-text>

          <v-card-actions>
            <v-btn flat dark>{{ $t('userApplication.viewProfile') }}</v-btn>
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
      ssn: String
    }
  }
}
</script>
