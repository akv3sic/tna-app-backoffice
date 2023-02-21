<template>
  <div>
    <Header />
    <v-container fluid class="pa-0">
      <v-img src="./../assets/img/rfid-card-reader.png" width="15%" class="center mt-9-prcnt"></v-img>
      <h1 class="text-h4 text-center mt-4" v-if="!useAsTnaTerminal">Sustav za evidenciju prisutnosti</h1>
      <p class="text-center text-subtitle-1 mt-7" v-if="!useAsTnaTerminal">Lorem, ipsum dolor sit amet consectetur adipisicing elit.<br> Eaque error a molestias provident rerum? Dolore!</p>
      <!--^^^^^^^^^^^^^^^^^^^-->
      <!-- active event info -->
      <div class="mt-8" v-if="useAsTnaTerminal">
        <v-row>
          <v-col></v-col>
          <v-col>
            <v-card class="mx-auto" max-width="400" v-if="activeEvent">
              <v-card-title class="text-h6 text-center">
                {{ activeEventFormated.name }}
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <p class="text-subtitle-1">{{ activeEventFormated.description }}</p>
                    <p class="text-subtitle-2">
                      <v-icon>mdi-clock-start</v-icon>
                      {{ activeEventFormated.start }}
                    </p>
                    <p class="text-subtitle-2">
                      <v-icon>mdi-clock-end</v-icon>
                      {{ activeEventFormated.end }}
                    </p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <div v-else>

                <v-alert
                  type="info"
                  class="mt-5"
                  outlined
                >
                  Trenutno nema aktivnog događaja.
                </v-alert>
              </div>
          </v-col>
          <v-col></v-col>
        </v-row>
      </div> 
      <!----------------------->
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
import { formatDate } from '@/common/helpers/dateFormater'

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
      ...mapGetters('settings', ['useAsTnaTerminal']),
      ...mapGetters('tna', ['activeEvent']),

      // format dates in active event
      activeEventFormated() {
        if (this.activeEvent) {
          return {
            ...this.activeEvent,
            name: this.activeEvent.name.charAt(0).toUpperCase() + this.activeEvent.name.slice(1),
            description: this.activeEvent.description.charAt(0).toUpperCase() + this.activeEvent.description.slice(1),
            start: formatDate(this.activeEvent.start),
            end: formatDate(this.activeEvent.end)
          }
        }
      }
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
