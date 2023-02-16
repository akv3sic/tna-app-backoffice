<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="d-flex">
                    <h2 class="">Dodaj novi događaj</h2>
                    <v-btn text small class="red--text ml-4 mt-1" to="aktivni-dogadjaji">Odustani</v-btn>   
                </div>
            </v-col>
        </v-row>

        <v-form ref="addNewEventForm" lazy-validation v-model="valid" class="add-new-form"> 
            <v-row>
                <!--Data -->

                <!-- name -->
                <v-col cols="4" class="mx-auto">
                    <v-text-field v-model="name" :rules="[rules.required]" label="Naziv" maxlength="20" required></v-text-field>
                </v-col>
                <!-- location -->
                <v-col cols="4">
                    <v-select
                        v-model="location"
                        :items="locations"
                        item-text="name"
                        item-value="id"
                        label="Odaberi lokaciju"
                        :rules="[rules.required]"
                    ></v-select>
                </v-col>
                <!-- category -->
                <v-col cols="4">
                    <v-select
                        v-model="category"
                        :items="categories"
                        item-text="name"
                        item-value="id"
                        label="Odaberi kategoriju"
                        :rules="[rules.required]"
                    ></v-select>
                </v-col>

                <!-- description -->
                <v-col cols="12" class="mx-auto">
                    <v-textarea
                        name="description"
                        label="Opis"
                        v-model="description"
                    ></v-textarea>
                </v-col>

                <!-- date of event -->
                <v-col cols="4" class="">
                    <v-menu
                        ref="eventDate"
                        v-model="dateMenu"
                        :close-on-content-click="false"
                        :return-value.sync="eventDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="eventDate"
                            label="Datum događaja"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            required
                            :rules="[rules.required]"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="eventDate"
                        no-title
                        scrollable
                        >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="dateMenu = false"
                        >
                            Zatvori
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.eventDate.save(eventDate)"
                        >
                            Potvrdi
                        </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>

                <!-- start time -->
                <v-col cols="4" class="mt-2">
                    Početak: <vue-timepicker :minute-interval="5" v-model="start"></vue-timepicker>
                </v-col>

                <!-- end time -->
                <v-col cols="4" class="mt-2">
                    Kraj: <vue-timepicker :minute-interval="5" v-model="end"></vue-timepicker>
                </v-col>
                
                <!--add new btn -->
                <v-col cols="12" class="mx-auto">
                    <v-btn class="primary" :disabled="!valid" @click="addNewEvent">Dodaj dodađaj</v-btn>
                </v-col> 
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
import categories from '@/store/modules/categories'
import { mapGetters } from 'vuex'
import VueTimepicker from 'vue2-timepicker'

export default {
    name: "addNewEvent",
    components: {
        VueTimepicker
    },
    data: () => ({
        dateMenu: false,
        valid: false,

        // data
        eventDate: "",
        name: "",
        description: "",
        start:"00:00" , 
        end:"00:00",
        location: "",
        category: "",

        //  validation
        rules: {
        required: value => !!value || "Obavezno polje.",
        },
    }),
    methods: {
        addNewEvent() {
        if (this.$refs.addNewEventForm.validate()) {
            const event = {
                name: this.name,
                description: this.description,
                start: this.eventDate + " " + this.start + ":00",
                end: this.eventDate + " " + this.end + ":00",
                location: this.location,
                event_category: this.category,
            }
            
            this.$store.dispatch('events/postEvent', event)
            }
            this.$router.push({path: 'aktivni-dogadjaji'})
            this.valid = false
        },
    },
    mounted() {
        this.valid = false
        this.$store.dispatch('locations/fetchLocations')
        this.$store.dispatch('categories/fetchCategories')
    },
    computed: {
        ...mapGetters('locations', ['locations']),
        ...mapGetters('categories', ['categories']),
    },
}
</script>

<style>
@import 'vue2-timepicker/dist/VueTimepicker.css';

@media screen and (min-width: 1200px){
   .add-new-form {
    max-width: 50vw;
    } 
}
</style>