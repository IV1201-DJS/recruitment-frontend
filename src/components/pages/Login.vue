<template>
  <v-container fluid>
    <v-layout row>
      <v-flex sm10 offset-sm1 text-xs-right>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title v-t="'login.title'" />
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                :label="$t('user.username')"
                v-model="username"
                :error-messages="errors.username"
                @input="resetUsernameFieldErrors"
                @keyup.enter="login"
              />
              <v-text-field
                :label="$t('user.password')"
                v-model="password"
                :error-messages="errors.password"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                @input="resetPasswordFieldErrors"
                @keyup.enter="login"
              />

              <v-btn color="primary" @click="login" :loading="loginLoading" :disabled="loginDisabled">
                <span v-t="'login.title'" />
              </v-btn>

              <v-btn color="success" :to="{ name: 'Register' }">
                {{ $t('login.register') }}
              </v-btn>
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
    loginDisabled: true,
    loginLoading: false,
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
  computed: mapState([
    'loggedIn'
  ]),
  watch: {
    loggedIn: function (newState) {
      const routerPath = this.$store.state.loginRedirect
      this.$store.commit('updateLoginRedirect', '/')
      this.$router.push(routerPath)
    },
    username: function () {
      this.checkLoginDisable()
    },
    password: function () {
      this.checkLoginDisable()
    }
  },
  methods: {
    checkLoginDisable () {
      if (this.username === '') {
        this.loginDisabled = true
        return
      }

      if (this.password === '') {
        this.loginDisabled = true
        return
      }

      if (this.errors.username.length > 0) {
        this.loginDisabled = true
        return
      }

      if (this.errors.password.length > 0) {
        this.loginDisabled = true
        return
      }

      this.loginDisabled = false
    },
    resetUsernameFieldErrors () {
      this.errors.username = []
    },
    resetPasswordFieldErrors () {
      this.errors.password = []
    },
    async login () {
      if (this.loginDisabled) return

      try {
        this.loginLoading = true

        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        })
      } catch (e) {
        if (e === 409) {
          this.$router.push('/migrate')

          return
        }

        this.resetUsernameFieldErrors()
        this.resetPasswordFieldErrors()

        e.forEach(({ validation, field }) => {
          this.errors[field].push(this.$t(`login.${validation}.${field}`))
        })
      }

      this.loginLoading = false
    }
  }
}
</script>
