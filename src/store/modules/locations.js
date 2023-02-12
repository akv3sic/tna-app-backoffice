import httpClient from '@/common/httpClient'

// initial state
const state = () => ({
    isLoading: true,
    locations: [],
 })
 
 // getters
 const getters = {
    locations(state) {
        return state.locations;
    },
    isLoading(state) {
        return state.isLoading;
    },
 }
 
 // actions
 const actions = {

    fetchLocations( {commit}) {
        commit('REQUEST')
        const url = '/location/'
        httpClient.get(url)
            .then((response) => {
                console.log('response: ' + JSON.stringify(response.data))
                commit('SET_LOCATIONS', response.data)
            })
            .catch(err => {
                console.log(err)
             })
    },
 }
 
 // mutations
 const mutations = {
    SET_LOCATIONS (state, payload) {
        state.locations = payload
        state.isLoading = false
    },
    REQUEST (state){
        state.isLoading = true
    },
 }
 
 export default {
     namespaced: true,
     state,
     getters,
     actions,
     mutations
 }