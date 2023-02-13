import httpClient from "@/common/httpClient";

// initial state
const state = () => ({
    isLoading: true,
    users: [],
})

// getters 
const getters = {
    users(state) {
        return state.users;
    },
    isLoading(state) {
        return state.isLoading;
    }
}

// actions
const actions = {
    fetchUsers( {commit}) {
        commit('REQUEST')
        const url = '/users/'
        httpClient.get(url, {withCredentials: true})
            .then((response) => {
                commit('SET_USERS', response.data)
            })
            .catch(err => {
                console.log(err)
             })
    },
}

// mutations
const mutations = {
    SET_USERS (state, payload) {
        state.users = payload
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