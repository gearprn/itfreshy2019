import Vue from 'vue'
import Router from 'vue-router'
import loginPage from './views/loginPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: loginPage
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('./components/loginBox.vue')
    // },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: () => import('./components/registerCard.vue')
    // }
  ]
})
