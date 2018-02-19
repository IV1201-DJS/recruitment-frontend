<template>
  <v-container fluid>
    <v-jumbotron color="grey lighten-2">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3" v-t="'home.title'" />

            <span class="subheading" v-t="'home.subheading'" />
            <v-divider class="my-3" />

            <div class="title mb-3" v-t="'home.body'"></div>

            <v-btn large :to="{  }" color="primary" class="mx-0">
              <span v-t="'navbar.registerApplication'" />
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </v-container>
</template>
