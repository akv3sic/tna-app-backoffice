<template>
    <v-container class="">
        <h2 class="mb-2">Kategorije događaja</h2>
        <v-row class="mb-5">
            <v-col>
                <span class="accent--text"> Vaše kategorije događaja. </span>
            </v-col>
            <v-col>
                <v-btn class="accent px-5">
                    Nova kategorija
                </v-btn>
            </v-col>
        </v-row>

        <!-- category card -->
        <v-card 
            v-for="category in categories"
            :key="category.id"
            class="my-8"
        >
            <v-row>
                <v-col>
                    <v-card-title> {{ category.name }} </v-card-title>         
                    <v-card-text>
                         {{ category.description }} 
                    </v-card-text>
                </v-col>


                <v-col class="d-flex  align-end">     
                    <v-card-text>
                        Kreirano: {{ category.created_at }}
                        <br>
                        Ažurirano: {{ category.updated_at }}
                    </v-card-text>
                </v-col>

                <v-col>
                    <v-card-text class="">
                        <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="primary"
                        >
                        <v-icon dark>
                            mdi-pencil
                        </v-icon>
                        </v-btn>
                        <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="primary"
                        >
                        <v-icon dark>
                            mdi-delete-outline
                        </v-icon>
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
    name: "EventCategories",
    data: () => ({

    }),
    mounted() {
        this.fetchCategories()
    },
    methods: {
        fetchCategories() {
            this.$store.dispatch('categories/fetchCategories')
        },
    },
    computed: {
        
    ...mapGetters('categories', ['categories', 'isLoading']),
    },
}
</script>

<style>

</style>