// this module contains core logic for fetching active event at some location and for storing new attendance records
import httpClient from '@/common/httpClient';
import store from '@/store';

const state = {
    activeEvent: null, // the active event at some location, null if there is no active event
    isLoading: false,
};
  
const getters = {
    activeEvent: state => state.activeEvent,
    isLoading: state => state.isLoading,
};
  
const actions = {
    fetchActiveEvent({ commit}) {
        // check if there is already an active event
        commit('REQUEST')
        if (state.activeEvent) {
            // check if the active event has ended
            let endTime = new Date(state.activeEvent.end);
            let currentTime = new Date().getTime();
            if (endTime > currentTime) {
                // the active event is still ongoing, do not fetch again
                return;
            }
        }
        // fetch the active event from the API
        let url = '/next/'
        let locationId = store.getters['settings/terminalLocation'];
        url += locationId + '/';
        httpClient.get(url)
            .then((response) => {
                if(response.status == 204){
                    commit('SET_ACTIVE_EVENT', null);
                    return;
                }
                else if(response.status == 200){
                    commit('SET_ACTIVE_EVENT', response.data);
                    return;
                }
            })
            .catch(err => {
                console.log(err)
            })
    },
};

const mutations = {
    SET_ACTIVE_EVENT(state, event) {
        state.activeEvent = event;
        state.isLoading = false;
    },
    REQUEST(state) {
        state.isLoading = true;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};