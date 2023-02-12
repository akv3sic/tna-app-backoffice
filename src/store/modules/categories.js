import httpClient from '@/common/httpClient'

// initial state
const state = () => ({
    isLoading: true,
    categories: [],
 })
 
 // getters
 const getters = {
    categories(state) {
        return state.categories;
    },
    isLoading(state) {
        return state.isLoading;
    },
 }
 
 // actions
 const actions = {

    fetchCategories( {commit}) {
        commit('REQUEST')
        const url = '/categories/'
        httpClient.get(url, {withCredentials: true})
            .then((response) => {
                commit('SET_CATEGORIES', response.data)
            })
            .catch(err => {
                console.log(err)
             })
    },
 }
 
 // mutations
 const mutations = {
    SET_CATEGORIES (state, payload) {
        state.categories = payload
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