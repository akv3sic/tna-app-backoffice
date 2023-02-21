<template>
    <v-container class="">
        <h2 class="mb-2">Aktivni događaji</h2>
        <v-row class="mb-5">
            <v-col>
                <span class="accent--text"> Pregled nadolazećih događaja koje ste kreirali. </span>
            </v-col>
            <v-col>
                <v-btn class="primary px-5" to="dodaj-dogadjaj">
                    Novi događaj
                </v-btn>
            </v-col>
        </v-row>


        <!-- filters skeleton loader -->
        <div class="d-flex">
            <v-skeleton-loader
            v-if="isLoading"
            type="actions"
            class="my-4 d-flex ml-5"
        ></v-skeleton-loader>

        <v-skeleton-loader
            v-if="isLoading"
            type="actions"
            class="my-4 d-flex ml-5"
        ></v-skeleton-loader>
        </div>


        <!-- filters -->
        <div class="d-flex filters-section" v-if="!isLoading">
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
            <span class="filter-item" v-if="isThereFilters">
                <v-btn text class="mt-3" @click="removeFilters">
                    <v-icon>mdi-filter-remove</v-icon>
                    <span class="text-caption">Poništi filtere</span>
                </v-btn>
            </span>
        </div>

        <!-- events skeleton loader -->
        <v-skeleton-loader
            v-if="isLoading"
            type="article@5"
            class="my-8"
        ></v-skeleton-loader>

        <!-- event card -->
        <v-card 
            v-for="event in events"
            :key="event.id"
            class="my-8"
            v-else
        >
            <v-row>
                <v-col>
                    <v-card-title>
                        {{ event.name }} <v-icon color="red" v-if="event.isLive && showLiveIcon">mdi-circle-medium</v-icon>
                    </v-card-title>         
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
        showLiveIcon: true
    }),
    mounted() {
        this.fetchLocations()
        this.fetchCategories()
        this.fetchEvents()

        /* live icon blinking */
        setInterval(() => {
            this.showLiveIcon = !this.showLiveIcon
        }, 600)
        /**********************/
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
                active: true
            })
        },
        removeFilters() {
            this.selectedCategory = null
            this.selectedLocation = null
        }
    },
    computed: {
        
        ...mapGetters('locations', ['locations', 'isLoading']),
        ...mapGetters('categories', ['categories', 'isLoading']),
        ...mapGetters('events', ['events', 'isLoading']),

        isThereFilters() {
            return this.selectedCategory || this.selectedLocation
        }
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