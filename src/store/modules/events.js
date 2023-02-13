import httpClient from '@/common/httpClient'
import Swal from 'sweetalert2';

// initial state
const state = () => ({
    isLoading: true,
    events: [],
 })
 
 // getters
 const getters = {
    events(state) {
        return state.events;
    },
    isLoading(state) {
        return state.isLoading;
    },
 }
 
 // actions
 const actions = {

    fetchEvents( {commit}) {
        commit('REQUEST')
        const url = '/events/'
        httpClient.get(url, {withCredentials: true})
            .then((response) => {
                commit('SET_EVENTS', response.data)
            })
            .catch(err => {
                console.log(err)
             })
    },
    // post new category
    postEvent( {commit}, event) {
        commit('REQUEST')
        const url = '/event/'
        httpClient.post(url, event, {withCredentials: true})
            .then((response) => {
                if (response.status === 201) { // created
                    // call mutation
                    commit('POST_SUCCESS')
                    //call fetchCategories to update state
                    this.dispatch('categories/fetchCategories')
                }
            })
            .catch(err => {
                console.log(err)
             })
    },
 }
 
 // mutations
 const mutations = {
    SET_EVENTS (state, payload) {
        state.categories = payload
        state.isLoading = false
    },
    REQUEST (state){
        state.isLoading = true
    },
    POST_SUCCESS (state){
        state.isLoading = false
        Swal.fire({
            position: 'top-end',
            title: 'Uspješno ste dodali događaj!',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
        })
    }
 }
 
 export default {
     namespaced: true,
     state,
     getters,
     actions,
     mutations
 }