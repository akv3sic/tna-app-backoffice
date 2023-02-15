import httpClient from "@/common/httpClient";

// initial state
const state = () => ({
    isLoading: true,
    users: [],
    userAttendance: [],
    userAttendanceRecords: [],
    user: {},
})

// getters 
const getters = {
    users(state) {
        return state.users;
    },
    isLoading(state) {
        return state.isLoading;
    },
    userAttendance(state) {
        return state.userAttendance;
    },
    userAttendanceRecords(state) {
        return state.userAttendanceRecords;
    },
    user(state) {
        return state.user;
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
    fetchUserAttendance( {commit}, id) {
        commit('REQUEST')
        const url = '/users/' + id + '/'
        httpClient.get(url, {withCredentials: true})
            .then((response) => {
                commit('SET_USER_ATTENDANCE', response.data.filters)
                commit('SET_USER', response.data.user)
            })
            .catch(err => {
                console.log(err)
             })
    },
    // fetch attendance by user id and category id
    fetchUserAttendanceRecordsByCategory( {commit}, {user_id, category}) {
        commit('REQUEST')
        const url = '/record/' + user_id + '/'
        httpClient.get(url, {withCredentials: true, params: {category}})
            .then((response) => {
                commit('SET_USER_ATTENDANCE_RECORDS', response.data)
            })
            .catch(err => {
                console.log(err)
             })
    }

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
    SET_USER_ATTENDANCE (state, payload) {
        state.userAttendance = payload
        state.isLoading = false
    },
    SET_USER_ATTENDANCE_RECORDS (state, payload) {
        state.userAttendanceRecords = payload
        state.isLoading = false
    },
    SET_USER (state, payload) {
        state.user = payload
        state.isLoading = false
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}