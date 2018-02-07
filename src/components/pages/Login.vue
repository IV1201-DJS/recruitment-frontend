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
export default {
  data: () => ({
    e1: true,
    username: '',
    password: ''
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
    }
  },
  methods: {
    async login () {
      const res = await this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      })

      // The user has sucessfully logged in
      if (!res) return

      window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>
