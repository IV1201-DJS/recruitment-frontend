<template>
  <v-container grid-list-xl mt-5>
    <v-layout row>
      <v-flex sm10 offset-sm1 text-xs-right>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title v-t="'migration.title'" />
          </v-toolbar>

          <v-card-text>
            <v-text-field
              :label="$t('user.email')"
              v-model="email"
              :error-messages="errors.email"
            />
            <v-text-field
              :label="$t('user.firstname')"
              v-model="name"
              :error-messages="errors.name"
            />
            <v-text-field
              :label="$t('user.lastname')"
              v-model="surname"
              :error-messages="errors.surname"
            />
            <v-text-field
              :label="$t('user.ssn')"
              v-model="ssn"
              :error-messages="errors.ssn"
            />

            <v-btn color="primary" @click="migrate">
              {{ $t('migration.migrate') }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from '@/axios'
import { mapState } from 'vuex'

export default {
  data: () => ({
    password: '',
    email: '',
    name: '',
    ssn: '',
    surname: '',
    username: '',
    errors: {
      email: [],
      name: [],
      ssn: [],
      surname: []
    }
  }),
  computed: {
    ...mapState([
      'migrationData'
    ])
  },
  created () {
    this.username = this.migrationData.username
    this.password = this.migrationData.password

    this.migrate()
  },
  methods: {
    resetErrors () {
      this.errors = {
        email: [],
        name: [],
        ssn: [],
        surname: [],
        username: []
      }
    },
    async migrate () {
      this.resetErrors()

      if (!this.username || !this.password) {
        this.$router.push('/login')
        return
      }

      try {
        await axios.post('/api/migrate', {
          username: this.username,
          password: this.password,
          email: this.email,
          ssn: this.ssn,
          surname: this.surname,
          name: this.name
        })

        this.$store.dispatch('displaySuccessMessage', this.$t('migration.success'))
        this.$router.push('/login')
      } catch (e) {
        switch (e.response.status) {
          case 404:
            this.$router.push('/login')
            this.$store.dispatch('displayError', this.$t('login.invalid'))
            break
          case 422:
            e.response.data.errors.forEach(({ validation, field }) => {
              this.errors[field].push(this.$t(`register.${validation}.${field}`))
            })

            const legacyUser = e.response.data.legacyUser
            this.email = legacyUser.email || this.email
            this.username = legacyUser.username || this.username
            this.name = legacyUser.name || this.name
            this.ssn = legacyUser.ssn || this.ssn
            this.surname = legacyUser.surname || this.surname
            break
          case 500:
            this.$store.dispatch('displayError', this.$t('migration.alreadyMigrated'))
            this.$router.push('/login')
            break
          default:
            console.dir(e)
        }
      }
    }
  }
}
</script>
