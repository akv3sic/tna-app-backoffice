<template>
  <div>
    <Header />
    <v-container fluid class="pa-0">
      <v-img src="./../assets/img/rfid-card-reader.png" width="15%" class="center mt-9-prcnt"></v-img>
      <h1 class="text-h4 text-center mt-4">Sustav za evidenciju prisutnosti</h1>
      <p class="text-center text-subtitle-1 mt-7">Lorem, ipsum dolor sit amet consectetur adipisicing elit.<br> Eaque error a molestias provident rerum? Dolore!</p>
      <p class="text-center" v-if="!useAsTnaTerminal">
        <a href="#" target="_blank">Korisnička dokumentacija</a>
      </p>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/layout/TheHeader'
import Footer from '@/components/layout/TheFooter'
import { mapGetters } from 'vuex'

  export default {
    name: 'Home',

    components: {
      Header, Footer
    },
    mounted() {
      // fetch active event if useAsTnaTerminal is true
      if (this.useAsTnaTerminal)
        {
          this.fetchActiveEvent();
          // check if there is an active event every 5 minutes
          setInterval(() => {
            this.fetchActiveEvent();
          }, 300000);
        }
    },
    methods: {
      // call fetchActiveEvent action
      fetchActiveEvent() {
        this.$store.dispatch('tna/fetchActiveEvent');
      }
    },
    computed: {
      ...mapGetters('settings', ['useAsTnaTerminal'])
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
