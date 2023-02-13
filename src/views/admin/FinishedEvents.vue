<template>
    <v-container class="">
        <h2 class="mb-2">Završeni događaji</h2>
        <v-row class="mb-5">
            <v-col>
                <span class="accent--text"> Pregled završenih događaja. </span>
            </v-col>
        </v-row>

        <!-- filters -->
        <div class="d-flex filters-section">
            <span class="filter-item">
                 <v-select
                 v-model="selectedCategory"
                :items="categories"
                item-text="name"
                item-value="id"
                filled
                label="Filtriraj po kategoriji"
                ></v-select> 
            </span>
            <span class="filter-item">
                <v-select
                v-model="selectedLocation"
                :items="locations"
                item-text="name"
                item-value="id"
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
                        class="primary"
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
import { mapGetters } from "vuex";

export default {
    name: "ActiveEvents",
    data: () => ({
        selectedCategory: null,
        selectedLocation: null,
    }),
    mounted() {
    this.fetchLocations()
    this.fetchCategories()
    this.fetchEvents()
    },
    methods: {
        fetchLocations() {
            this.$store.dispatch('locations/fetchLocations')
        },
        fetchCategories() {
            this.$store.dispatch('categories/fetchCategories')
        },
        fetchEvents() {
            this.$store.dispatch('events/fetchEvents', {
                category: this.selectedCategory,
                location: this.selectedLocation,
                active: false
            })
        },
    },
    computed: {
        
    ...mapGetters('locations', ['locations', 'isLoading']),
    ...mapGetters('categories', ['categories', 'isLoading']),
    ...mapGetters('events', ['events', 'isLoading']),
    },
    watch: {
        selectedCategory() {
            this.fetchEvents()
        },
        selectedLocation() {
            this.fetchEvents()
        }
    }

}
</script>

<style>
.filter-item {
    max-width: 240px;
    margin: 0px 12px;
}   
</style>