// This file is used to store the settings of the application

// initial state
const state = () => ({
    isLoading: true,
    useAsTnaTerminal: localStorage.getItem('useAsTnaTerminal') === 'true',
    terminalLocation: localStorage.getItem('terminalLocation') || null,
})

// getters
const getters = {
    isLoading(state) {
        return state.isLoading;
    },
    useAsTnaTerminal(state) {
        return state.useAsTnaTerminal;
    },
    terminalLocation(state) {
        return state.terminalLocation;
    },
}

// actions
const actions = {
    setUseAsTnaTerminal({ commit }, payload) {
        commit('SET_USE_AS_TNA_TERMINAL', payload)
    },
    setTerminalLocation({ commit }, payload) {
        commit('SET_TERMINAL_LOCATION', payload)
    }
}

// mutations
const mutations = {
    SET_USE_AS_TNA_TERMINAL(state, payload) {
        state.useAsTnaTerminal = payload
        state.isLoading = false
        localStorage.setItem('useAsTnaTerminal', payload)
    },
    SET_TERMINAL_LOCATION(state, payload) {
        state.terminalLocation = payload
        state.isLoading = false
        localStorage.setItem('terminalLocation', payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}