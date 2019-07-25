import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'
import 'font-awesome/css/font-awesome.min.css'

import App from './App.vue'
import router from './router'
import store from './store'
import BrowserAlert from './components/BrowserAlert.vue'
import firebase from "firebase"
import FirebaseService from './services/FirebaseService'
import Chat from 'vue-beautiful-chat'

import AOS from 'aos';
import 'aos/dist/aos.css';

import './registerServiceWorker'

AOS.init();

Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

Vue.use(VueSimplemde)
Vue.use(Chat)

new Vue({
  router,
  store,
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
				// console.log("login", user);
        this.$store.commit('setUser', {
          user: user
        })
        this.$store.commit('setUserChat', {
          messageList: FirebaseService.getUserMessageList()
        })
				// console.log("login", this.$store.state.userChat);
      } else {
        this.$store.commit('setUser', {
          user: null
        })
        this.$store.commit('setUserChat', {
          messageList: []
        })
        // console.log(this.$store.state.user, "logout!!!");
      }
    })
  },
  render: h => h(App)
}).$mount('#app')

new Vue({
  router,
  store,
  render: h => h(BrowserAlert)
}).$mount('#browserAlert')
