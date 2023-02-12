<template>
    <v-container class="">
        <h2 class="mb-2">Aktivni događaji</h2>
        <v-row class="mb-5">
            <v-col>
                <span class="accent--text"> Pregled nadolazećih događaja koje ste kreirali. </span>
            </v-col>
            <v-col>
                <v-btn class="accent px-5" to="dodaj-dogadjaj">
                    Novi događaj
                </v-btn>
            </v-col>
        </v-row>

        <!-- filters -->
        <div class="d-flex filters-section">
            <span class="filter-item">
                 <v-select
                 v-model="selectedCategory"
                :items="eventCategories"
                item-text="name"
                filled
                label="Filtriraj po kategoriji"
                ></v-select> 
            </span>
            <span class="filter-item">
                <v-select
                v-model="selectedLocation"
                :items="locations"
                item-text="name"
                filled
                label="Filtriraj po lokaciji"
                ></v-select>
            </span>
        </div>
        

        <!-- event card -->
        <v-card 
            v-for="event in events"
            :key="event.id"
            class="my-8"
        >
            <v-row>
                <v-col>
                    <v-card-title> {{ event.name }} </v-card-title>         
                    <v-card-text>
                         {{ event.description }} 
                    </v-card-text>
                </v-col>


                <v-col class="d-flex  align-end">     
                    <v-card-text>
                        Početak: {{ event.start }}
                        <br>
                        Kraj: {{ event.end }}
                    </v-card-text>
                </v-col>

                <v-col>
                    <v-card-text>
                        <v-btn 
                        class="mt-3 primary"
                        :to="'/admin/detalji-dogadjaja/' + event.id"
                        >
                        Detalji događaja
                        </v-btn>
                        
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
       
        <!-- stranicenje -->
        <v-pagination
        :length="3"
        disabled
        ></v-pagination>
      
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "ActiveEvents",
    data: () => ({
        selectedCategory: null,
        selectedLocation: null,
       // mock data
       events: [{
            id: 1,
            name: "Događaj 1",
            description: "Opis događaja 1",
            start: "2020-12-12",
            end: "2020-12-12",
        },
        {
            id: 2,
            name: "Događaj 2",
            description: "Opis događaja 2",
            start: "2020-12-12",
            end: "2020-12-12",
        },
        {
            id: 3,
            name: "Događaj 3",
            description: "Opis događaja 3",
            start: "2020-12-12",
            end: "2020-12-12",
        },
        {
            id: 4,
            name: "Događaj 4",
            description: "Opis događaja 4",
            start: "2020-12-12",
            end: "2020-12-12",
        },
        {
            id: 5,
            name: "Događaj 5",
            description: "Opis događaja 5",
            start: "2020-12-12",
            end: "2020-12-12",
        },
        {
            id: 6,
            name: "Događaj 6",
            description: "Opis događaja 6",
            start: "2020-12-12",
            end: "2020-12-12",
        },
        {
            id: 7,
            name: "Događaj 7",
            description: "Opis događaja 7",
            start: "2020-12-12",
            end: "2020-12-12",
        },
        {
            id: 8,
            name: "Događaj 8",
            description: "Opis događaja 8",
            start: "2020-12-12",
            end: "2020-12-12",
        },
        {
            id: 9,
            name: "Događaj 9",
            description: "Opis događaja 9",
            start: "2020-12-12",
            end: "2020-12-12",
       },],
       eventCategories: [{
            id: 1,
            name: "Kategorija 1",
        },
        {
            id: 2,
            name: "Kategorija 2",
        },
        {
            id: 3,
            name: "Kategorija 3",
        },
        {
            id: 4,
            name: "Kategorija 4",
        },
        {
            id: 5,
            name: "Kategorija 5",
        },
        {
            id: 6,
            name: "Kategorija 6",
        },
        {
            id: 7,
            name: "Kategorija 7",
        },
        {
            id: 8,
            name: "Kategorija 8",
        },
        {
            id: 9,
            name: "Kategorija 9",
       }],
    }),
    mounted() {
        this.fetchLocations()
    },
    methods: {
        fetchLocations() {
            this.$store.dispatch('locations/fetchLocations')
        }
    },
    computed: {
        
    ...mapGetters('locations', ['locations', 'isLoading']),
    },

}
</script>

<style>
.filter-item {
    max-width: 240px;
    margin: 0px 12px;
}   
</style>