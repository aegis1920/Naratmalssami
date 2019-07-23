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

new Vue({
	router,
	store,
	created() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.$store.state.user = user;
				// alert(user.displayName)
				// console.log(user)
				this.$store.state.accessToken = user.accessToken;
			} else {
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
