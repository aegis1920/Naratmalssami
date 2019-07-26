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
    userChat: [],
    intro: false
  },
  mutations: {
    setUser(state, payload) {
      if (payload.user == null) {
        state.user.userName = '';
        state.user.userEmail = '';
      } else {
        state.user.userName = payload.user.displayName;
        state.user.userEmail = payload.user.email;
      }
    },
    setUserChat(state, payload) {
      if (payload.messageList.length != 0) {
        payload.messageList.then((result) => {
          // console.log(result);
          state.userChat = result;
        }).catch((err) => {
          // console.log("로그인한 사용자가 없습니다.");
        })
      }
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getUserChat(state) {
      return state.userChat;
    }
  }
})
