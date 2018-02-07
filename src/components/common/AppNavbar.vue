<template>
  <v-toolbar color="primary" dark>
    <v-toolbar-title class="title" v-t="'navbar.brandName'" @click="landingPage" />
    <v-spacer />

    <v-toolbar-side-icon class="hidden-md-and-up" />

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="{ name: 'RegisterApplication' }"><span v-t="'navbar.registerApplication'" /></v-btn>
      <v-btn flat :to="{ name: 'Profile' }"><span v-t="'navbar.profile'" /></v-btn>
      <v-btn flat :to="{ name: 'SearchApplication' }"><span v-t="'navbar.applications'" /></v-btn>
      <v-btn flat @click="logout"><span v-t="'navbar.logout'" /></v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
  methods: {
    landingPage () {
      this.$router.push('/')
    },
    logout () {
      localStorage.removeItem('token')
      location.reload()
    }
  }
}
</script>
<style lang="sass" scoped>

.title:hover
  cursor: pointer

</style>
