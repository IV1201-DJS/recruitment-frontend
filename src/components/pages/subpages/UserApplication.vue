<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="cyan darken-3" class="white--text" ripple raised>
          <v-card-title primary-title>
            <div class="headline">{{ application.user.firstname }} {{ application.user.lastname }}</div>
          </v-card-title>

          <v-card-text>
            <h3>{{ $t('userApplication.dateOfRegistration') }}: {{ application.date_of_registration }}</h3>
          </v-card-text>

          <v-card-actions>
            <v-btn flat dark :to="{ name: 'ViewApplication', params: { id: application.id } }">
              {{ $t('userApplication.viewProfile') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: {
    application: {
      id: Number,
      user: {
        id: Number,
        firstName: String,
        lastName: String
      },
      date_of_registration: String
    }
  }
}
</script>
