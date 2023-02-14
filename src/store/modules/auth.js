import httpClient from '@/common/httpClient'
import Swal from 'sweetalert2'
import router from '../../router'

// initial state
const state = () => ({
    status: '',
    user: {},
    adminPermissions: false,
    avatarText: ''
})

// getters
const getters = {
    isLoggedIn: state => !!state.token,
    hasAdminPermissions: state => state.adminPermissions,
    authStatus: state => state.status,
    user: state => state.user,
    avatarText: state => state.avatarText
}

// actions
const actions = {
    logIn({commit}, user){
        return new Promise((resolve, reject) => {
            commit('auth_request')
            httpClient.post("/login/", user)
            .then(response => {
                console.log(response)
                // check response status
                if(response.status === 200) { // OK
                    // call mutation
                    router.push("/admin")
                    commit('auth_success')
                    resolve(response)
                }
            })
            .catch(err => {
                commit('auth_error')
                reject(err)
            })
        })
    },

    fetchUser({commit}) {
        return new Promise((resolve, reject) => {
            httpClient.get("/me/")
            .then(response => {
                if(response.status === 200) { // OK
                    // assign response data
                    const user = response.data
                    commit('fetch_user_success', {user})
                    resolve(response)
                }
            })
            .catch(err => {
                commit('auth_error')
                reject(err)
            })
        })
    },

    register({commit}, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            httpClient.post("/registracija/", user)
            .then(response => {
                console.log(response.data)
                // check response status
                if(response.status === 201) { // resource created 
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
    logOut({commit}) {
        return new Promise((resolve, reject) => {
            httpClient.post("/logout/")
            .then((response) => {
                // Success :)
                console.log(response);
                console.log("Odjava");
                commit('logout')
                resolve(response)
                commit('logout_success_alert')
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
    auth_request(state){
        state.status= 'loading'
    },
    auth_error(state){
        state.status = 'error'
    },
    auth_success(state){
        state.status = 'success'
    },
    auth_admin(state){
        state.adminPermissions= true
    },
    fetch_user_success(state, {user}){
        state.status = 'success'
        state.user = user
        state.avatarText = state.user.first_name[0].toUpperCase() + state.user.last_name[0].toUpperCase()
        // capitalize first letter of first and last name
        state.user.first_name = state.user.first_name.charAt(0).toUpperCase() + state.user.first_name.slice(1)
        state.user.last_name = state.user.last_name.charAt(0).toUpperCase() + state.user.last_name.slice(1)
    },
    logout(state){
        state.status = ''
        state.user = {}
    },
    /* successful registration alert */
    registration_success_alert(){
        Swal.fire({
            text: 'Račun uspješno napravljen.',
            icon: 'success',
            confirmButtonText: 'Nastavak'
          })
          .then(() => router.push("/moj-racun"))
    },
    /*********************************/
    /* successful registration alert */
    logout_success_alert(){
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