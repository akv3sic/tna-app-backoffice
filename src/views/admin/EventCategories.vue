<template>
    <v-container class="">
        <h2 class="mb-2">Kategorije događaja</h2>
        <v-row class="mb-5">
            <v-col>
                <span class="accent--text"> Vaše kategorije događaja. </span>
            </v-col>
            <v-col>
                <v-btn class="primary px-5" v-if="!addNewActivated" @click="toggleAddNewActivated">
                    Nova kategorija
                </v-btn>
            </v-col>
        </v-row>
        
        <!-- add a category -->
        <v-row v-if="addNewActivated" class="mx-1">
                    <v-col cols="3">
                        <v-text-field
                            label="Naziv kategorije"
                            v-model="newCategory.name"
                        ></v-text-field>  
                    </v-col>
                    <v-col cols="7">
                        <v-text-field
                            label="Opis kategorije"
                            v-model="newCategory.description"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-btn text small class="primary--text mt-2" @click="addNewCategory">Potvrdi</v-btn>  
                        <v-btn text small class="text red--text mt-2" @click="toggleAddNewActivated">x</v-btn>  
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
        addNewActivated: false,
        newCategory: {
            name: '',
            description: '',
        },
    }),
    mounted() {
        this.fetchCategories()
    },
    methods: {
        fetchCategories() {
            this.$store.dispatch('categories/fetchCategories')
        },
        toggleAddNewActivated() {
            this.addNewActivated = !this.addNewActivated
        },
        addNewCategory() {
            this.$store.dispatch('categories/postCategory', this.newCategory)
            this.addNewActivated = false
            this.newCategory = {
                name: '',
                description: '',
            }
        },
    },
    computed: {
        
    ...mapGetters('categories', ['categories', 'isLoading']),
    },
}
</script>

<style>

</style>