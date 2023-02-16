<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
  // change meta title on route change
  created() {
    this.$router.afterEach((to, from) => {
      document.title = "TNA - " + to.meta.title || "Time & Attendance System";
    });
  },
};
</script>
