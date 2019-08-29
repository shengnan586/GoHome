import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    isAction: 1
};

const mutations = {
    SET_ACTION(state, data) {
        state.isAction = data
    }
}

const actions = {
    actionGoBack({ commit, state }, param) {
        commit('SET_ACTION', param);
    }
}

export default new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions
});
