<template>
  <v-container grid-list-xl mt-5>
    <v-layout row>
      <v-flex sm10 offset-sm1 text-xs-right>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title v-t="'message.login'" />
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                :label="usernameLocale"
                v-model="username"
                :error-messages="errors.username"
                @input="resetUsernameField"
              />
              <v-text-field
                :label="passwordLocale"
                v-model="password"
                :error-messages="errors.password"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                @input="resetPasswordField"
                @keyup.enter="login"
              />

              <v-btn color="primary" @click="login" v-t="'message.login'" />
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    e1: true,
    username: '',
    password: '',
    timeout: 3000,
    snackbar: false,
    errors: {
      username: [],
      password: []
    }
  }),
  computed: {
    usernameLocale () {
      return this.$t('user.username')
    },
    passwordLocale () {
      return this.$t('user.password')
    },
    ...mapState([
      'loggedIn'
    ])
  },
  watch: {
    loggedIn: function (newState) {
      const routerPath = this.$store.state.loginRedirect
      this.$store.commit('updateLoginRedirect', '/')
      this.$router.push(routerPath)
    }
  },
  methods: {
    resetUsernameField () {
      this.errors.username = []
    },
    resetPasswordField () {
      this.errors.password = []
    },
    async login () {
      try {
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        })
      } catch (e) {
        this.resetUsernameField()
        this.resetPasswordField()

        e.forEach(({ validation, field }) => {
          this.errors[field].push(this.$t(`login.${validation}.${field}`))
        })
      }
    }
  }
}
</script>
