<template>
    <v-container class="">
        <h2 class="mb-2">Aktivni događaji</h2>
        <v-row class="mb-5">
            <v-col>
                <span class="accent--text"> Lorem ipsum dolor sit amet consectetur adipisicing. </span>
            </v-col>
            <v-col>
                <v-btn class="accent px-5" to="novi-dogadjaj">
                    Novi događaj
                </v-btn>
            </v-col>
        </v-row>

       
        <!-- stranicenje -->
        <v-pagination
        :length="3"
        disabled
        ></v-pagination>
      
    </v-container>
</template>

<script>

export default {
    name: "ActiveEvents",
    data: () => ({
       //
    }),
}
</script>

<style>
.filter-item {
    max-width: 240px;
    margin: 0px 12px;
}   
</style>