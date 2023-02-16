import httpClient from '@/common/httpClient'
import Swal from 'sweetalert2';
import { formatDate } from '@/common/helpers/dateFormater'

// initial state
const state = () => ({
    isLoading: true,
    events: [],
    event: {},
    eventRecords: [],
    hasTheEventFinished: null,
    hasTheEventStarted: null,
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
    },
    hasTheEventFinished(state) {
        return state.hasTheEventFinished;
    },
    hasTheEventStarted(state) {
        return state.hasTheEventStarted;
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
        // loop through events and format date
        state.events.forEach(event => {
            event.start = formatDate(event.start)
            event.end = formatDate(event.end)
        })
    },
    SET_EVENT (state, payload) {
        state.event = payload
        state.isLoading = false
        // check if event is finished and started
        const today = new Date()
        const eventEnd = new Date(state.event.end)
        const eventStart = new Date(state.event.start)
        state.hasTheEventFinished = eventEnd < today
        state.hasTheEventStarted = eventStart < today
        // format dates
        state.event.created_at = formatDate(state.event.created_at)
        // add nul check for updated_at
        state.event.updated_at ? state.event.updated_at = formatDate(state.event.updated_at) : state.event.updated_at = null
        state.event.start = formatDate(state.event.start)
        state.event.end = formatDate(state.event.end)
    },
    SET_EVENT_RECORDS (state, payload) {
        state.eventRecords = payload
        // loop through records and format dates
        state.eventRecords.forEach(record => {
            record.in_time = formatDate(record.in_time)
            record.out_time = formatDate(record.out_time)
        })
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