<template>
    <v-container>
        <h2 class="mb-2">Pregled prisutnosti - {{ user.first_name  }} {{ user.last_name  }}</h2>

        <v-row>
            <v-col>
                <v-chip class="mr-2 mb-2" color="primary">
                    Odabrana kategorija: 45%
                </v-chip>
                <v-chip
                    v-for="category in categories"
                    key="category.id"
                    class="mr-2 mb-2"
                >
                    {{ category.name }}: {{ category.percentage }}
                </v-chip>
            </v-col>
        </v-row>

        <h3 class="mt-5">Popis prisutnosti</h3>

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
            v-for="record in records"
            :key="record.id"
            class="pa-1 my-2"
            outlined
        >
            <v-row>
            <v-col cols="5" md="3">
                <v-row class="hidden-md-and-up"> 
                    <v-col class="text-caption">Ulazak</v-col>
                </v-row>
                {{ record.in}}
            </v-col><v-col cols="3" md="4">
                <v-row class="hidden-md-and-up"> 
                    <v-col class="text-caption">Izlazak</v-col>
                </v-row>
                {{ record.out}}
            </v-col>

            <v-col  cols="12" md="2">
                <v-row class="hidden-md-and-up"> 
                    <v-col class="text-caption">Tip</v-col>
                </v-row>
                {{ record.type}}
            </v-col>
            </v-row>
        </v-card>
        <!-- ************************** -->
    </v-container>
</template>

<script>
export default {
    name: "AttendanceDetails",
    data: () => ({
        user: {
            id: 1,
            first_name: "Pero",
            last_name: "Perić",
            email: "test@mail.ba",
        },
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
        categories: [{
            id: 1,
            name: "Kategorija 1",
            percentage: "90%",
        },
        {
            id: 2,
            name: "Kategorija 2",
            percentage: "70%",
        }]
    })
}
</script>

<style lang="">
    
</style>