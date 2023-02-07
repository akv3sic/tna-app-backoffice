<template>
    <v-container>
        <v-row>
            <v-col>
                <span class="text-h5">Dodaj novi događaj</span>
                <div class="ml-2 d-inline">
                    <v-btn text small class="red--text" to="aktivni-dogadjaji">Odustani</v-btn>   
                </div>
            </v-col>
        </v-row>

        <v-form ref="addNewEventForm" lazy-validation v-model="valid" class="add-new-form"> 
            <v-row>
                <!--Data -->

                <!-- name -->
                <v-col cols="12" class="mx-auto">
                    <v-text-field v-model="name" :rules="[rules.required]" label="Naziv" maxlength="20" required></v-text-field>
                </v-col>

                <!-- description -->
                <v-col cols="12" class="mx-auto">
                    <v-textarea
                        name="description"
                        label="Opis"
                        v-model="description"
                    ></v-textarea>
                </v-col>

                <!-- start -->
                <v-col cols="6" class="">
                    <v-menu
                        ref="startDate"
                        v-model="startDateMenu"
                        :close-on-content-click="false"
                        :return-value.sync="start"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="start"
                            label="Početak"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            required
                            :rules="[rules.required]"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="start"
                        no-title
                        scrollable
                        >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="startDateMenu = false"
                        >
                            Zatvori
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.startDate.save(start)"
                        >
                            Potvrdi
                        </v-btn>
                        </v-date-picker>
                    </v-menu>
                </v-col>

                <!--end -->
                <v-col cols="6" class="">
                    <v-menu
                        ref="endDate"
                        v-model="endDateMenu"
                        :close-on-content-click="false"
                        :return-value.sync="end"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="end"
                            label="Završetak"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            required
                            :rules="[rules.required]"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="end"
                        no-title
                        scrollable
                        >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="endDateMenu = false"
                        >
                            Zatvori
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.endDate.save(end)"
                        >
                            Potvrdi
                        </v-btn>
                        </v-date-picker>
                    </v-menu>
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
export default {
    name: "addNewEvent",
    data: () => ({
        startDateMenu: false,
        endDateMenu: false,
        valid: false,

        // data
        name: "",
        description: "",
        start: "",
        end: "",

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
                start: this.start,
                end: this.end,
            }
            console.log(event)
            }
            this.$router.push({path: 'aktivni-dogadjaji'})
        },
    }
}
</script>

<style>
@media screen and (min-width: 1200px){
   .add-new-form {
    max-width: 50vw;
    } 
}
</style>