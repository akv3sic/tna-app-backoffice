<template>
    <v-container>
        <div class="d-flex">
            <h2 class="mb-2">Detalji događaja</h2>
        </div>
        <v-row>
            <v-col>Naziv: {{ event.name }} </v-col>
            <v-col>
                <v-icon>mdi-clock-start</v-icon>
                <span class="ml-2">{{ event.start }}</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col>Opis: {{ event.description }} </v-col>
            <v-col>
                <v-icon>mdi-clock-end</v-icon>
                <span class="ml-2">{{ event.end }}</span>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <span class="text-caption">Kreirano: {{ event.created_at }} </span>
                <br>
                <span class="text-caption" v-if="event.updated_at">Ažurirano: {{ event.updated_at }} </span>
            </v-col>
        </v-row>

        <div class="mt-5"> <!-- samo u slučaju da ima zapisa o prisutnosti -->
            <h3>Popis prisutnosti</h3>
            <!-- ********** messages  *********** -->
            <v-row v-if="!isLoading">
                <v-col>
                    <v-alert type="info" class="mt-5" outlined>
                        <span v-if="hasTheEventFinished && records.length == 0">Nitko nije bio prisutan na ovome
                            događaju.</span>
                        <span v-if="!hasTheEventStarted">Događaj počinje {{ event.start }}.</span>
                        <span v-if="hasTheEventStarted && records.length == 0 && !hasTheEventFinished">Događaj je u tijeku.
                            Još nitko nije došao.</span>
                        <span v-if="hasTheEventStarted && records.length != 0 && !hasTheEventFinished">Događaj je u
                            tijeku.</span>
                        <span v-if="hasTheEventFinished && records.length != 0">Događaj je završen. Broj prisutnih: {{
                            records.length }}</span>
                    </v-alert>
                </v-col>
            </v-row>

            <!-- ******************************* -->
            <!-- **** ZAGLAVLJE liste **** -->
            <v-row class="hidden-sm-and-down mt-1" v-if="records.length != 0">
                <v-col class="text-left" cols="3">
                    Ime i prezime
                </v-col>
                <v-col class="text-left" cols="3">
                    Ulazak
                </v-col>
                <v-col class="text-left" cols="6">
                    Izlazak
                </v-col>
            </v-row>
            <!-- ************************** -->


            <!-- **** STAVKE liste **** -->
            <v-card v-for="record in records" :key="record.id" class="pa-1 my-2" outlined>
                <v-row>
                    <v-col cols="3" md="3">
                        {{ record.user.first_name }} {{ record.user.last_name }}
                    </v-col>
                    <v-col cols="5" md="3">
                        <v-row class="hidden-md-and-up">
                            <v-col class="text-caption">Ulazak</v-col>
                        </v-row>
                        {{ record.in_time }}
                    </v-col><v-col cols="3" md="4">
                        <v-row class="hidden-md-and-up">
                            <v-col class="text-caption">Izlazak</v-col>
                        </v-row>
                        {{ record.out_time }}
                    </v-col>

                    <v-col cols="12" md="2">
                        <v-row class="hidden-md-and-up">
                            <v-col class="text-caption">Tip</v-col>
                        </v-row>
                        {{ record.type }}
                    </v-col>
                </v-row>
            </v-card>
            <!-- ************************** -->
        </div>
    </v-container>
</template>


<script>
export default {
    name: "EventDetails",
    data: () => ({

    }),
    created() {
        this.fetchEvent()
    },
    methods: {
        fetchEvent() {
            this.$store.dispatch('events/fetchEventDetails', this.$route.params.id)
        },
    },
    computed: {
        event() {
            return this.$store.getters['events/event']
        },
        records() {
            return this.$store.getters['events/eventRecords']
        },
        isLoading() {
            return this.$store.getters['events/isLoading']
        },
        hasTheEventFinished() {
            return this.$store.getters['events/hasTheEventFinished']
        },
        hasTheEventStarted() {
            return this.$store.getters['events/hasTheEventStarted']
        },
    },
}
</script>

<style lang="">
    
</style>