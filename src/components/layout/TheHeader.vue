<template>
    <v-app-bar
      app
      color="primary"
      dark
      class="mx-9 my-6"
      rounded
    >
      <div class="d-flex align-center">
        <v-img
          alt="TNA Logo"
          class="shrink mr-2"
          contain
          src="./../../assets/img/logo.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        to="/prijava"
        text
      >
        <span class="mr-2">Prijava</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
 export default {
    name: "Header",
    data: () => ({
        //
    }),
 }
</script>