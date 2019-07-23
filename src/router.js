import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import BoardPage from './views/BoardPage.vue'
import AboutusPage from './views/AboutusPage.vue'
import FirebaseService from './services/FirebaseService'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
		{
			path: '/',
			name: 'home',
			component: HomePage,
      beforeEnter(to, from, next){
        FirebaseService.updateViewPageCount(to.name);
        next();
      }
		},
		{
			path: '/board',
			name: 'board',
			component: BoardPage,
      beforeEnter(to, from, next){
        FirebaseService.updateViewPageCount(to.name);
        next();
      }
		},
    {
			path: '/aboutus',
			name: 'aboutus',
			component: AboutusPage,
      beforeEnter(to, from, next){
        FirebaseService.updateViewPageCount(to.name);
        next();
      }
		}
  ]
})
