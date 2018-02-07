<template>
  <v-toolbar>
    <v-toolbar-title>Recruitment application</v-toolbar-title>
    <v-spacer />

    <v-toolbar-side-icon class="hidden-md-and-up" />

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="{ name: 'RegisterApplication' }">Register application</v-btn>
      <v-btn flat :to="{ name: 'Profile' }">Profile</v-btn>
      <v-btn flat :to="{ name: 'SearchApplication' }">Application search</v-btn>
      <v-btn flat @click="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
  methods: {
    logout () {
      localStorage.clear()
      location.reload()
    }
  }
}
</script>
