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
                :label="emailLocale"
                v-model="email"
                :error-messages="errors.email"
              />
              <v-text-field
                :label="firstNameLocale"
                v-model="firstName"
                :error-messages="errors.firstName"
              />
              <v-text-field
                :label="lastNameLocale"
                v-model="lastName"
                :error-messages="errors.lastName"
              />
              <v-text-field
                :label="ssnLocale"
                v-model="ssn"
                :error-messages="errors.ssn"
              />
              <v-text-field
                :label="usernameLocale"
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
export default {
  data: () => ({
    email: '',
    name: '',
    ssn: '',
    surname: '',
    username: '',
    errors: {
      email: [],
      name: [],
      ssn: [],
      surname: [],
      username: []
    }
  }),
  created () {
    const legacyUser = this.$store.state.legacyUser
    // The there is no data -> redirect to login page
    if (!legacyUser) {
      this.$router.push('/login')

      return
    }

    this.email = legacyUser.email
    this.firstName = legacyUser.name
    this.lastName = legacyUser.surname
    this.ssn = legacyUser.ssn
    this.username = legacyUser.username
  },
  computed: {
    accountMigrationLocale () {
      return this.$t('migration.title')
    },
    emailLocale () {
      return this.$t('user.email')
    },
    firstNameLocale () {
      return this.$t('user.firstName')
    },
    lastNameLocale () {
      return this.$t('user.lastName')
    },
    ssnLocale () {
      return this.$t('user.ssn')
    },
    emailLocale () {
      return this.$t('user.email')
    },
    usernameLocale () {
      return this.$t('user.username')
    }
  }
}
</script>
