<template>
     <v-footer padless class="to-bottom">
    <v-col
      class="text-center"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Ugradbeni računalni sustavi</strong>
    </v-col>
  </v-footer>
</template>

<script>
 export default {
    name: "Footer",
    data: () => ({
        //
    }),
 }
</script>

<style>
.to-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>