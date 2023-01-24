<template>
  <div>
    <Header />
    <v-container fluid class="pa-0">
      this is home :)
    </v-container>
  </div>
</template>

<script>
import Header from '@/components/layout/TheHeader'

  export default {
    name: 'Home',

    components: {
      Header
    },
  }
</script>
