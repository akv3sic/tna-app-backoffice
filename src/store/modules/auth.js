import httpClient from '@/common/httpClient'
import Swal from 'sweetalert2'
import router from '../../router'

// initial state
const state = () => ({
    status: '',
    user: {},
    staffPermissions: false,
    sudoPermissions: false,
    avatarText: ''
})

// getters
const getters = {
    isLoggedIn: state => !!state.token,
    hasStaffPermissions: state => state.staffPermissions,
    hasSudoPermissions: state => state.sudoPermissions,
    authStatus: state => state.status,
    user: state => state.user,
    avatarText: state => state.avatarText
}

// actions
const actions = {
    logIn({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            httpClient.post("/login/", user)
                .then(response => {
                    console.log(response)
                    // check response status
                    if (response.status === 200) { // OK
                        // call /me/ endpoint to get user data and wait for response
                        httpClient.get("/me/")
                            .then(response => {
                                // check response status
                                if (response.status === 200) { // OK
                                    // assign response data
                                    const user = response.data
                                    // set user data
                                    commit('fetch_user_success', { user })
                                    // set permissions
                                    commit('SET_STAFF_PERMISSIONS', user.is_staff)
                                    commit('SET_SUDO_PERMISSIONS', user.is_superuser)
                                    // USER IS NOT STAFF OR SUPERUSER - DENY ACCESS
                                    if (!user.is_staff && !user.is_superuser) {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'Nemate pravo pristupa!',
                                            showConfirmButton: false,
                                            timer: 1500,
                                            position: 'top-end',
                                        })
                                        commit('auth_error')
                                    }
                                    else {
                                        // USER IS STAFF OR SUPERUSER - ALLOW ACCESS
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Uspješna prijava!',
                                            text: user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1) + ', dobro došli natrag!',
                                            showConfirmButton: false,
                                            timer: 1500,
                                            position: 'top-end',
                                        })
                                        // set isAuth to true to local storage
                                        localStorage.setItem('isAuth', true)
                                        commit('auth_success')
                                        router.push("/admin")
                                    }
                                }
                            })
                        resolve(response)
                    }
                })
                .catch(err => {
                    commit('auth_error')
                    reject(err)
                })
        })
    },

    fetchUser({ commit }) {
        return new Promise((resolve, reject) => {
            httpClient.get("/me/")
                .then(response => {
                    if (response.status === 200) { // OK
                        // assign response data
                        const user = response.data
                        commit('fetch_user_success', { user })
                        resolve(response)
                    }
                })
                .catch(err => {
                    commit('auth_error')
                    reject(err)
                })
        })
    },

    register({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            httpClient.post("/registracija/", user)
                .then(response => {
                    console.log(response.data)
                    // check response status
                    if (response.status === 201) { // resource created 
                        // assign response data
                        const token = response.data.token
                        const avatarText = response.data.username[0] + response.data.userlastname[0]
                        // save token to local storage
                        localStorage.setItem('token', token)

                        // save display name to local storage
                        localStorage.setItem('avatarText', avatarText)
                        httpClient.defaults.headers.common['Authorization'] = 'Token ' + token

                        // call mutation
                        commit('auth_success', { token, avatarText })
                        commit('registration_success_alert')
                        resolve(response)
                    }
                })
                .catch(err => {
                    commit('auth_error', err)
                    reject(err)
                })
        })
    },
    logOut({ commit }) {
        return new Promise((resolve, reject) => {
            httpClient.post("/logout/")
                .then((response) => {
                    // Success :)
                    console.log(response);
                    if (response.status === 200) { // OK
                        commit('logout')
                        localStorage.setItem('isAuth', false)
                        commit('logout_success_alert')
                    }
                    resolve(response)
                })
                .catch((error) => {
                    // Error :\
                    if (error.response) {
                        /*
                         * The request was made and the server responded with a
                         * status code that falls out of the range of 2xx
                         */
                        console.log(error.response.data);
                        console.log(error.response.status);
                        // console.log(error.response.headers);
                    } else if (error.request) {
                        /*
                         * The request was made but no response was received, `error.request`
                         * is an instance of XMLHttpRequest in the browser and an instance
                         * of http.ClientRequest in Node.js
                         */
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request and triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                    reject(error)
                });
        })
    }
}

// mutations
const mutations = {
    auth_request(state) {
        state.status = 'loading'
    },
    auth_error(state) {
        state.status = 'error'
    },
    auth_success(state) {
        state.status = 'success'
    },
    auth_admin(state) {
        state.adminPermissions = true
    },
    SET_STAFF_PERMISSIONS(state, value) {
        state.staffPermissions = value
    },
    SET_SUDO_PERMISSIONS(state, value) {
        state.sudoPermissions = value
    },
    fetch_user_success(state, { user }) {
        state.status = 'success'
        state.user = user
        state.avatarText = state.user.first_name[0].toUpperCase() + state.user.last_name[0].toUpperCase()
        // capitalize first letter of first and last name
        state.user.first_name = state.user.first_name.charAt(0).toUpperCase() + state.user.first_name.slice(1)
        state.user.last_name = state.user.last_name.charAt(0).toUpperCase() + state.user.last_name.slice(1)
    },
    logout(state) {
        state.status = ''
        state.user = {}
        state.staffPermissions = false
        state.sudoPermissions = false
    },
    /* successful registration alert */
    registration_success_alert() {
        Swal.fire({
            text: 'Račun uspješno napravljen.',
            icon: 'success',
            confirmButtonText: 'Nastavak'
        })
            .then(() => router.push("/moj-racun"))
    },
    /*********************************/
    /* successful registration alert */
    logout_success_alert() {
        Swal.fire({
            width: 400,
            position: 'top-end',
            icon: 'info',
            title: 'Uspješno ste odjavljeni.',
            showConfirmButton: false,
            timer: 1500
        })
    }

    /*********************************/
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}