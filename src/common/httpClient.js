import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios)


const httpClient = Vue.axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});


export default httpClient;