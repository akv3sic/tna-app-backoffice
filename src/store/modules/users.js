import httpClient from "@/common/httpClient";

// initial state
const state = () => ({
    isLoading: true,
    recordsLoading: false,
    categoriesLoading: true,
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
    },
    categoriesLoading(state) {
        return state.categoriesLoading;
    },
    recordsLoading(state) {
        return state.recordsLoading;
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
        commit('REQUEST_USER_ATTENDANCE')
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
        commit('REQUEST_USER_ATTENDANCE_RECORDS')
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
    REQUEST_USER_ATTENDANCE (state){
        state.categoriesLoading = true
    },
    REQUEST_USER_ATTENDANCE_RECORDS (state){
        state.recordsLoading = true
    },
    SET_USER_ATTENDANCE (state, payload) {
        state.userAttendance = payload
        state.categoriesLoading = false
    },
    SET_USER_ATTENDANCE_RECORDS (state, payload) {
        state.userAttendanceRecords = payload
        state.recordsLoading = false
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