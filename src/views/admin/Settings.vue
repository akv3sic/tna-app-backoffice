<template>
    <v-container>
        <div class="d-flex">
            <h2 class="mb-2">Postavke</h2>
        </div>
        <v-row class="mb-1">
            <v-col>
                <span class="accent--text"> Ovdje možete odabrati želite li koristiti ovu web aplikaciju kao terminal za
                    cvikanje RFID kartica. </span>
            </v-col>
        </v-row>
        <v-row class="">
            <v-col>
                <!-- switch to choose to use this app as tna terminal or not -->
                <v-switch v-model="useAsTnaTerminal" label="Koristi kao terminal za cvikanje kartica" color="primary"
                    class="mt-2"></v-switch>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="4" lg="3">
                <v-select v-model="terminalLocation" :items="locations" item-text="name" item-value="id" filled
                    label="Odaberi lokaciju terminala" :disabled="!useAsTnaTerminal"
                    prepend-icon="mdi-map-marker"></v-select>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Settings',
    data: () => ({
        //
    }),
    mounted() {
        // fetch locations from locations module
        this.$store.dispatch('locations/fetchLocations');
    },
    computed: {
        ...mapGetters('locations', ['locations']),
        terminalLocation: {
            get() {
                return this.$store.getters['settings/terminalLocation'];
            },
            set(value) {
                this.$store.dispatch('settings/setTerminalLocation', value);
            },
        },
        useAsTnaTerminal: {
            get() {
                return this.$store.getters['settings/useAsTnaTerminal'];
            },
            set(value) {
                this.$store.dispatch('settings/setUseAsTnaTerminal', value);
            },
        },
    },
    watch: {
        useAsTnaTerminal(value) {
            if (value) {
                this.$store.dispatch('settings/setUseAsTnaTerminal', true);
            } else {
                this.$store.dispatch('settings/setUseAsTnaTerminal', false);
            }
        },
        terminalLocation(value) {
            this.$store.dispatch('settings/setTerminalLocation', value);
        },
    },

}
</script>
<style></style>