import httpClient from '@/common/httpClient'
import Swal from 'sweetalert2';

// initial state
const state = () => ({
    isLoading: true,
    events: [],
    event: {},
    eventRecords: [],
 })
 
 // getters
 const getters = {
    events(state) {
        return state.events;
    },
    isLoading(state) {
        return state.isLoading;
    },
    event(state) {
        return state.event;
    },
    eventRecords(state) {
        return state.eventRecords;
    }
 }
 
 // actions
 const actions = {
    // fetch events and filter by category, location and active(true/false) using query params
    fetchEvents( {commit}, {category, location, active}) {
        commit('REQUEST')
        const url = '/event/'
        httpClient.get(url, {withCredentials: true, params: {category, location, active}})  // query params are passed as an object to the params property
            .then((response) => {                                                    // of the config object
                commit('SET_EVENTS', response.data)
            })
            .catch(err => {
                console.log(err)
            })
    },  

    // fetch event details
    fetchEventDetails( {commit}, id) {
        commit('REQUEST')
        const url = '/event/' + id + '/'
        httpClient.get(url, {withCredentials: true})
            .then((response) => {
                commit('SET_EVENT', response.data.event)
                commit('SET_EVENT_RECORDS', response.data.records)
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
        state.events = payload
        state.isLoading = false
    },
    SET_EVENT (state, payload) {
        state.event = payload
        state.isLoading = false
    },
    SET_EVENT_RECORDS (state, payload) {
        state.eventRecords = payload
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