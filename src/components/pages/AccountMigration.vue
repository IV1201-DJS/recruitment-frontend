<template>
  <v-container grid-list-xl mt-5>
    <v-layout row>
      <v-flex sm10 offset-sm1 text-xs-right>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title v-t="'migration.title'" />
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                :label="$t('user.email')"
                v-model="email"
                :error-messages="errors.email"
              />
              <v-text-field
                :label="$t('user.firstname')"
                v-model="firstName"
                :error-messages="errors.firstName"
              />
              <v-text-field
                :label="$t('user.lastname')"
                v-model="lastName"
                :error-messages="errors.lastName"
              />
              <v-text-field
                :label="$t('user.ssn')"
                v-model="ssn"
                :error-messages="errors.ssn"
              />
              <v-text-field
                :label="$t('user.username')"
                v-model="username"
                :error-messages="errors.username"
              />

              <v-btn color="primary" v-t="'migration.migrate'" />
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data: () => ({
    email: '',
    name: '',
    ssn: '',
    firstName: '',
    lastName: '',
    username: '',
    errors: {
      email: [],
      name: [],
      ssn: [],
      firstName: [],
      lastName: [],
      username: []
    }
  }),
  computed: {
    ...mapState([
      'migrationData'
    ])
  },
  created () {
    this.migrate()
  },
  methods: {
    async migrate () {
      if (!this.migrationData.username || !this.migrationData.password) {
        this.$router.push('/login')
      }

      const res = await axios.post('/api/migrate', this.migrationData)

      console.log('Trying to migrate')
      console.dir(res)
    }
  }
}
</script>
