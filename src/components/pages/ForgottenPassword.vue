<template>
  <v-container fluid>
    <v-layout row>
      <v-flex sm10 offset-sm1 text-xs-right>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title v-t="'forgotten.title'" />
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                :label="$t('user.email')"
                v-model="email"
                :error-messages="errors.email"
              />

              <v-btn color="primary"
                     @click="sendForgotten">
                {{ $t('forgotten.send') }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    email: '',
    errors: {
      email: []
    }
  }),
  methods: {
    async sendForgotten () {
      console.log(this.email)
    }
  }
}
</script>
