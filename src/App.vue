<template>
  <v-app>
    <v-toolbar flat color="white" height="100%" app>
      <router-link to="/" aria-label="Hjem">
        <v-toolbar-side-icon aria-label="Hjem">
          <v-img
            :src="require('./assets/logo.png')"
            contain
            height="64"
            width="64"
          ></v-img>
        </v-toolbar-side-icon>
      </router-link>
    </v-toolbar>

   <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<style>
.theme--light.application {
  background: transparent !important;
}
</style>
