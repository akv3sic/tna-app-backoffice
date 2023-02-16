<template>
    <v-container>
        <h2 class="mb-2">Pregled prisutnosti - {{ user.first_name }} {{ user.last_name }}</h2>
        <v-row class="">
            <v-col>
                <span class="accent--text"> Pregled prisutnosti za odabranog korisnika. Odaberite kategoriju ako želite vidjeti zapise. </span>
            </v-col>
        </v-row>
        <v-row>
            <v-col>

                <!-- **** kategorije - skeleton loader **** -->
                <div class="d-flex mt-2 ml-1" v-if="categoriesLoading">
                    <v-skeleton-loader
                    v-for="n in 3"
                    :key="n"
                    class="mr-4"
                    type="chip"
                    >
                    </v-skeleton-loader>
                </div>

                <!-- **** prikaz kategorija i postotaka **** -->
                <v-chip-group v-model="selectedCategory">
                    <v-chip
                        v-for="category in userAttendance"
                        :key="category.category_id"
                        class="mr-2 mb-2"
                        :color="categoryChipColor(category.percentage)"
                        filter
                        :value="category.category_id"
                        v-if="!categoriesLoading"
                    >
                        {{ category.category }}: {{ category.percentage }}%
                    </v-chip>
                </v-chip-group>

            </v-col>
        </v-row>

        <h3 class="mt-5" v-if="selectedCategory !=null">Popis prisutnosti</h3>


        <!-- **** lista - skeleton loader **** -->

        <v-skeleton-loader
            v-if="recordsLoading"
            type="table-thead, table-row@9"
            class="mx-2 mt-3"
        ></v-skeleton-loader>

        <div v-if="selectedCategory !=null & !recordsLoading"> <!-- **** LISTA **** -->
            <!-- **** ZAGLAVLJE liste **** -->
            <v-row class="hidden-sm-and-down mt-1">
                <v-col class="text-left" cols="3">
                    Ulazak
                </v-col>
                <v-col class="text-left" cols="6">
                    Izlazak
                </v-col>
            </v-row>
            <!-- ************************** -->

            
            <!-- **** STAVKE liste **** -->
            <v-card
                v-for="record in userAttendanceRecords"
                :key="record.id"
                class="pa-1 my-2"
                outlined
            >
                <v-row>
                <v-col cols="5" md="3">
                    <v-row class="hidden-md-and-up"> 
                        <v-col class="text-caption">Ulazak</v-col>
                    </v-row>
                    {{ record.in_time}}
                </v-col><v-col cols="3" md="4">
                    <v-row class="hidden-md-and-up"> 
                        <v-col class="text-caption">Izlazak</v-col>
                    </v-row>
                    {{ record.out_time ? record.out_time : "Nije odjavljen"}}
                </v-col>

                <v-col  cols="12" md="2">
                    <v-row class="hidden-md-and-up"> 
                        <v-col class="text-caption">Tip</v-col>
                    </v-row>
                    {{ record.type}}
                </v-col>
                </v-row>
            </v-card>
        </div>
        <!-- ************************** -->
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "AttendanceDetails",
    data: () => ({
        selectedCategory: null,
        records: [{
            id: 1,
            in: "2020-01-01 10:00:00",
            out: "2020-01-01 12:00:00",
            type: "RFID",
        },
        {
            id: 2,
            in: "2020-01-01 13:00:00",
            out: "2020-01-01 15:00:00",
            type: "RFID",
        }],
    }),
    created() {
        this.$store.dispatch("users/fetchUserAttendance", this.$route.params.id);
    },
    methods: {
        categoryChipColor(category_percentage) {
            if (category_percentage >= 70) {
                return "green lighten-2";
            } else {
                return "grey lighten-2";
            }
        },
    },
    computed: {
        ...mapGetters('users', ['user','userAttendance', 'userAttendanceRecords', 'categoriesLoading', 'recordsLoading']),
    },
    watch: {
        selectedCategory() {
            console.log(this.selectedCategory);
            this.$store.dispatch("users/fetchUserAttendanceRecordsByCategory", { "user_id": this.$route.params.id, "category": this.selectedCategory });
        },
    },
}
</script>

<style>

</style>