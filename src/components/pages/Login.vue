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
                :error-messages="errors.collect(usernameLocale)"
                v-validate="'required'"
                :data-vv-name="usernameLocale"
              />
              <v-text-field
                :label="passwordLocale"
                v-model="password"
                :error-messages="errors.collect(passwordLocale)"
                v-validate="'required|min:6|max:32'"
                :data-vv-name="passwordLocale"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
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
    error: ''
  }),
  filters: {
    lowerCase (data) {
      return data.toLowerCase()
    }
  },
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
    async login () {
      await this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>
