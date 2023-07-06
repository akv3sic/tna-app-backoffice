<template>
  <div>
    <Header v-if="!useAsTnaTerminal" />
    <v-container fluid class="pa-0">
      <v-img src="./../assets/img/rfid-card-reader.png" width="15%" class="center mt-9-prcnt"></v-img>
      <h1 class="text-h4 text-center mt-4" v-if="!useAsTnaTerminal">Sustav za evidenciju prisutnosti</h1>
      <p class="text-center text-subtitle-1 mt-7" v-if="!useAsTnaTerminal">Lorem, ipsum dolor sit amet consectetur
        adipisicing elit.<br> Eaque error a molestias provident rerum? Dolore!</p>
      <!--^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^--->
      <!------------------------------------ TNA SECTION ------------------------------------>
      <div class="mt-8" v-if="useAsTnaTerminal">
        <v-row>
          <v-col></v-col>
          <v-col cols="7">
            <!----------------- RFID input field (hidden) ---------------->
            <input ref="RFIDinput" id="RFIDinput" type="text" @blur="focusRFIDInput" @keydown.enter="handleRFIDentered" />
            <!--********************************************************-->
            <!------------------active event info card ---------------->
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
              <v-progress-linear :value="eventProgress"></v-progress-linear>
            </v-card>
            <!--*************************************************-->
            <div v-else class="d-flex justify-center">
              <v-alert type="info" class="mt-5 d-flex justify-center" outlined min-width="400" max-width="700">
                Trenutno nema aktivnog događaja.
                <!-- spinning loader -->
                <v-progress-circular v-if="isLoading" indeterminate color="primary" class="ml-4"
                  size="20"></v-progress-circular>
              </v-alert>
            </div>
          </v-col>
          <v-col></v-col>
        </v-row>
      </div>
      <!-------------------------------------------------------------------------------->
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
  data() {
    return {
      updatedDateTime: new Date()
    }
  },
  created() {
    // update date and time every 15 seconds
    setInterval(() => {
      this.updatedDateTime = new Date();
    }, 15000);
  },
  mounted() {
    // fetch active event if useAsTnaTerminal is true
    if (this.useAsTnaTerminal) {
      this.fetchActiveEvent();
      this.focusRFIDInput();
      // check if there is an active event every 5 minutes
      setInterval(() => {
        this.fetchActiveEvent();
      }, 300000);
    }

    // toggle terminal mode when Alt + T key is pressed
    window.addEventListener('keydown', (e) => {
      if ((e.key === 't' || e.key === 'T') && e.altKey) {
        this.toggleTerminalMode();
      }
    });
  },
  methods: {
    // call fetchActiveEvent action
    fetchActiveEvent() {
      this.$store.dispatch('tna/fetchActiveEvent');
    },
    // focus RFID input field
    focusRFIDInput() {
      this.$refs.RFIDinput.focus();
    },
    handleRFIDentered() {
      const card_id = this.$refs.RFIDinput.value;
      // regex test for valid RFID (10 digits)
      const regex = /^\d{10}$/;
      if (regex.test(card_id)) {
        const record = {
          card_id,
          event: this.activeEvent.id
        }
        this.$store.dispatch('tna/postAttendanceRecord', record);
        this.$refs.RFIDinput.value = ''; // clear input field
        this.focusRFIDInput();
      }
      else {
        this.$refs.RFIDinput.value = ''; // clear input field
        this.focusRFIDInput();
        console.log("Invalid RFID")
      }
    },

    //toggle terminal mode: use as tna terminal or not
    toggleTerminalMode() {
      this.$store.dispatch('settings/toggleTerminalMode');
    }
  },
  computed: {
    ...mapGetters('settings', ['useAsTnaTerminal']),
    ...mapGetters('tna', ['activeEvent', 'isLoading']),

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
    },
    // event progress in %
    eventProgress() {
      if (this.activeEvent) {
        const start = new Date(this.activeEvent.start);
        const end = new Date(this.activeEvent.end);
        const now = this.updatedDateTime;
        const total = end - start;
        const current = now - start;
        return (current / total) * 100;
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

#RFIDinput {
  position: absolute;
  top: -100px;
  left: -100px;
}
</style>
