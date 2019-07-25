import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: '',
    user: '',
    intro: false,
    nowBoard: {

    },
  },
  getters: {
    getNowBoard(state) {
        return state.nowBoard;
    }
  },
  mutations: {
    addBoard: (state, payload) => {
        state.nowBoard = payload;
    }
  },
  actions: {
    addBoard: ({ commit }, payload) => {
        commit('addBoard', payload);
    }
  },
})
