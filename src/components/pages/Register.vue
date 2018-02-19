<template>
  <v-container fluid>
    <v-layout row>
      <v-flex sm10 offset-sm1 text-xs-right>
        <v-card>
          <v-toolbar color="indigo" dark>
            <v-toolbar-title v-t="'register.title'" />
          </v-toolbar>

          <v-card-text>
            <v-form>
              <v-text-field
                :label="firstnameLocale"
                v-model="firstname"
                :error-messages="errors.firstname"
                @input="resetFirstnameErrors"
              />
              <v-text-field
                :label="lastnameLocale"
                v-model="lastname"
                :error-messages="errors.lastname"
                @input="resetLastnameErrors"
              />
              <v-text-field
                :label="ssnLocale"
                v-model="ssn"
                :error-messages="errors.ssn"
                @input="resetSSNErrors"
              />
              <v-text-field
                :label="emailLocale"
                v-model="email"
                :error-messages="errors.email"
                @input="resetEmailErrors"
              />
              <v-text-field
                :label="usernameLocale"
                v-model="username"
                :error-messages="errors.username"
                @input="resetUsernameErrors"
              />
              <v-text-field
                :label="passwordLocale"
                v-model="password"
                :error-messages="errors.password"
                @input="resetPasswordErrors"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
              />
              <v-text-field
                :label="passwordConfirmLocale"
                v-model="passwordConfirm"
                :error-messages="errors.passwordConfirm"
                @input="validatePassword"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
              />

              <v-btn color="success" :to="{ name: 'Login' }" v-t="'register.back'" />

              <v-btn color="primary" @click="register" :loading="registerLoading" :disabled="registerDisabled">
                <span v-t="'register.register'" />
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
    e1: true,
    registerDisabled: true,
    registerLoading: false,
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    ssn: '',
    email: '',
    passwordConfirm: '',
    errors: {
      username: [],
      password: [],
      passwordConfirm: [],
      firstname: [],
      lastname: [],
      ssn: [],
      email: []
    }
  }),
  watch: {
    username: function () {
      this.checkRegisterDisable()
    },
    password: function () {
      this.checkRegisterDisable()
    },
    passwordConfirm: function () {
      this.checkRegisterDisable()
    },
    email: function () {
      this.checkRegisterDisable()
    },
    ssn: function () {
      this.checkRegisterDisable()
    },
    firstname: function () {
      this.checkRegisterDisable()
    },
    lastname: function () {
      this.checkRegisterDisable()
    }
  },
  methods: {
    checkRegisterDisable () {
      if (this.username === '' ||
      this.password === '' ||
      this.passwordConfirm === '' ||
      this.email === '' ||
      this.ssn === '' ||
      this.firstname === '' ||
      this.lastname === '') {
        this.registerDisabled = true

        return
      }

      const errors = this.errors

      if (errors.username.length > 0 ||
      errors.password.length > 0 ||
      errors.passwordConfirm.length > 0 ||
      errors.email.length > 0 ||
      errors.ssn.length > 0 ||
      errors.firstname.length > 0 ||
      errors.lastname.length > 0) {
        this.registerDisabled = true

        return
      }

      this.registerDisabled = false
    },
    validatePassword () {
      this.errors.passwordConfirm = []

      if (this.passwordConfirm === '') {
        this.errors.passwordConfirm.push(this.$t('register.required.password_confirm'))
      }

      if (this.password !== this.passwordConfirm) {
        this.errors.passwordConfirm.push(this.$t('register.password_confirm_mismatch'))
      }
    },
    resetUsernameErrors () {
      this.errors.username = []
    },
    resetPasswordErrors () {
      this.errors.password = []
    },
    resetFirstnameErrors () {
      this.errors.firstname = []
    },
    resetLastnameErrors () {
      this.errors.lastname = []
    },
    resetSSNErrors () {
      this.errors.ssn = []
    },
    resetEmailErrors () {
      this.errors.email = []
    },
    async register () {
      try {
        this.registerLoading = true

        await this.$store.dispatch('register', {
          username: this.username,
          firstname: this.firstname,
          lastname: this.lastname,
          ssn: this.ssn,
          email: this.email,
          password: this.password
        })

        this.$router.push('/login')
      } catch (e) {
        this.resetUsernameErrors()
        this.resetPasswordErrors()
        this.resetFirstnameErrors()
        this.resetLastnameErrors()
        this.resetSSNErrors()
        this.resetEmailErrors()

        e.forEach(({ validation, field }) => {
          this.errors[field].push(this.$t(`register.${validation}.${field}`))
        })

        this.validatePassword()
        this.checkRegisterDisable()
      }

      this.registerLoading = false
    }
  },
  computed: {
    accountMigrationLocale () {
      return this.$t('migration.title')
    },
    firstnameLocale () {
      return this.$t('user.firstname')
    },
    lastnameLocale () {
      return this.$t('user.lastname')
    },
    ssnLocale () {
      return this.$t('user.ssn')
    },
    emailLocale () {
      return this.$t('user.email')
    },
    usernameLocale () {
      return this.$t('user.username')
    },
    passwordLocale () {
      return this.$t('user.password')
    },
    passwordConfirmLocale () {
      return this.$t('register.password_confirm')
    }
  }
}
</script>
