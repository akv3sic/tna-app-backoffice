<template>
    <v-container class="">
        <h2 class="mb-2">Završeni događaji</h2>
        <v-row class="mb-5">
            <v-col>
                <span class="accent--text"> Pregled završenih događaja. </span>
            </v-col>
        </v-row>

        <!-- filters skeleton loader -->
        <div class="d-flex">
            <v-skeleton-loader v-if="isLoading" type="actions" class="mb-2 d-flex ml-5"></v-skeleton-loader>

            <v-skeleton-loader v-if="isLoading" type="actions" class="mb-2 d-flex ml-5"></v-skeleton-loader>
        </div>

        <!-- filters -->
        <div class="d-flex filters-section" v-if="!isLoading">
            <span class="filter-item">
                <v-select v-model="selectedCategory" :items="categories" item-text="name" item-value="id" filled
                    label="Filtriraj po kategoriji"></v-select>
            </span>
            <span class="filter-item">
                <v-select v-model="selectedLocation" :items="locations" item-text="name" item-value="id" filled
                    label="Filtriraj po lokaciji"></v-select>
            </span>
            <span class="filter-item" v-if="isThereFilters">
                <v-btn text class="mt-3" @click="removeFilters">
                    <v-icon>mdi-filter-remove</v-icon>
                    <span class="text-caption">Poništi filtere</span>
                </v-btn>
            </span>
        </div>

        <!-- events skeleton loader -->
        <v-skeleton-loader v-if="isLoading" type="article@5" class="my-8"></v-skeleton-loader>

        <!-- event card -->
        <div v-else>
            <v-card v-for="event in events" :key="event.id" class="my-8">
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
                            <v-btn class="primary" :to="'/admin/detalji-dogadjaja/' + event.id">
                                Detalji događaja
                            </v-btn>

                        </v-card-text>
                    </v-col>
                </v-row>
            </v-card>
        </div>

        <!-- stranicenje -->
        <v-pagination :length="3" disabled></v-pagination>

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