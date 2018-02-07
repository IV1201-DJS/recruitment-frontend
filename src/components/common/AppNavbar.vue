<template>
  <v-toolbar>
    <v-toolbar-title v-t="'navbar.brandName'" />
    <v-spacer />

    <v-toolbar-side-icon class="hidden-md-and-up" />

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="{ name: 'RegisterApplication' }"><span v-t="'navbar.registerApplication'" /></v-btn>
      <v-btn flat :to="{ name: 'Profile' }"><span v-t="'navbar.profile'" /></v-btn>
      <v-btn flat :to="{ name: 'SearchApplication' }"><span v-t="'navbar.profile'" /></v-btn>
      <v-btn flat @click="logout"><span v-t="'navbar.logout'" /></v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
  methods: {
    logout () {
      localStorage.removeItem('token')
      location.reload()
    }
  }
}
</script>
