<template>
    <v-container>
        <div class="d-flex">
            <h2 class="mb-2">Pregled prisutnosti po osobama</h2>
        </div>
        <v-row class="">
            <v-col>
                <span class="accent--text"> Odabirom željene osobe možete vidjeti više detalja. </span>
            </v-col>
       </v-row>
        <div class="mt-5">

            <!-- **** lista - skeleton loader **** -->

            <v-skeleton-loader
                v-if="isLoading"
                type="table-thead, table-row@9"
                class="mx-6 mt-9"
            ></v-skeleton-loader>

    
             <!-- **** ZAGLAVLJE liste **** -->
             <v-row class="hidden-sm-and-down mt-1" v-if="!isLoading && users.length != 0">
                <v-col class="text-left" cols="3">
                    Ime i prezime
                </v-col>
                <v-col class="text-left" cols="3">
                    E-mail
                </v-col>
                <v-col class="text-left" cols="6">
                    
                </v-col>
            </v-row>
            <!-- ************************** -->
            
            <!-- **** STAVKE liste **** -->
            <v-card
                v-for="user in users"
                :key="user.id"
                class="pa-1 my-2"
                outlined
                v-if="!isLoading"
            >
                <v-row>
                <v-col cols="3" md="3">
                    {{ user.first_name}} {{ user.last_name}}
                </v-col>
                <v-col cols="5" md="3">
                    <v-row class="hidden-md-and-up"> 
                        <v-col class="text-caption">E-mail</v-col>
                    </v-row>
                    {{ user.email}}
                </v-col><v-col cols="3" md="4">
                    <v-row class="hidden-md-and-up"> 
                        <v-col class="text-caption"></v-col>
                    </v-row>
                    
                </v-col>
    
                <v-col  cols="12" md="2">
                    <router-link :to="'/admin/pregled-prisutnosti/' + user.id" class="rm-underline">
                        <v-icon>mdi-account-details</v-icon>
                    </router-link>
                </v-col>
                </v-row>
            </v-card>
            <!-- ************************** -->
        </div>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "OverviewByPerson",
    data: () => ({
        
    }),
    mounted() {
        this.fetchUsers()
    },
    methods: {
        fetchUsers() {
            this.$store.dispatch('users/fetchUsers')
        }
    },
    computed: {
        ...mapGetters('users', ['users', 'isLoading'])
    }
}
</script>

<style >
.rm-underline{
    text-decoration: none;
}
</style>