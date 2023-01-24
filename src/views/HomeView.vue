<template>
  <div>
    <Header />
    <v-container fluid class="pa-0">
      <v-img src="./../assets/img/rfid-card-reader.png" width="15%" class="center mt-9-prcnt"></v-img>
      <h1 class="text-h4 text-center mt-4">Sustav za evidenciju prisutnosti</h1>
      <p class="text-center text-subtitle-1 mt-7">Lorem, ipsum dolor sit amet consectetur adipisicing elit.<br> Eaque error a molestias provident rerum? Dolore!</p>
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


<style>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

.mt-9-prcnt {
  margin-top: 9%;
}
</style>
