import httpClient from '@/common/httpClient'
import Swal from 'sweetalert2';
import { formatDate } from '@/common/helpers/dateFormater'

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
    // post new category
    postCategory( {commit}, category) {
        commit('REQUEST')
        const url = '/categories/'
        httpClient.post(url, category, {withCredentials: true})
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
    SET_CATEGORIES (state, payload) {
        state.categories = payload
        state.isLoading = false
        // loop though categories and format dates
        state.categories.forEach(category => {
            category.created_at = formatDate(category.created_at)
            category.updated_at ? category.updated_at = formatDate(category.updated_at) : category.updated_at = null
        })
    },
    REQUEST (state){
        state.isLoading = true
    },
    POST_SUCCESS (state){
        state.isLoading = false
        Swal.fire({
            position: 'top-end',
            title: 'Uspješno ste dodali kategoriju!',
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