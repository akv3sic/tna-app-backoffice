<template>
    <v-container>
        <div class="d-flex">
            <h2 class="mb-2">Pregled prisutnosti po osobama</h2>
        </div>
       
        <div class="mt-5">
    
             <!-- **** ZAGLAVLJE liste **** -->
             <v-row class="hidden-sm-and-down mt-1">
                <v-col class="text-left" cols="3">
                    Ime i prezime
                </v-col>
                <v-col class="text-left" cols="3">
                    e-mail
                </v-col>
                <v-col class="text-left" cols="6">
                    Ukupno prisutnost
                </v-col>
            </v-row>
            <!-- ************************** -->
    
            
            <!-- **** STAVKE liste **** -->
            <v-card
                v-for="user in users"
                :key="user.id"
                class="pa-1 my-2"
                outlined
            >
                <v-row>
                <v-col cols="3" md="3">
                    {{ user.first_name}} {{ user.last_name}}
                </v-col>
                <v-col cols="5" md="3">
                    <v-row class="hidden-md-and-up"> 
                        <v-col class="text-caption">e-mail</v-col>
                    </v-row>
                    {{ user.email}}
                </v-col><v-col cols="3" md="4">
                    <v-row class="hidden-md-and-up"> 
                        <v-col class="text-caption">lorem ipsum</v-col>
                    </v-row>
                    some col
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
        users() {
            return this.$store.getters['users/users']
        }
    }
}
</script>

<style >
.rm-underline{
    text-decoration: none;
}
</style>