import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		accessToken: '',
		user: {
      userName: '',
      userEmail: ''
    },
    userChat: {},
    intro: false
  },
  mutations: {
    setUser(state, payload){
      if(payload.user==null){
        state.user.userName = '';
        state.user.userEmail = '';
      } else {
        state.user.userName = payload.user.displayName;
        state.user.userEmail = payload.user.email;
      }
    },
    setUserChat(state, userChat){
      state.userChat = userChat;
    },
    getUser(state){
      return state.user;
    }
  },
  getters: {
    getUser(state){
      return state.user;
    }
  }
})
