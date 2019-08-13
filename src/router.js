import Vue from 'vue'
import Router from 'vue-router'
import loginPage from './views/loginPage.vue'
import dashboardPage from './views/dashboardPage.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: loginPage,
      alias: '/login'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboardPage,
      // meta: {
      //   requiredAuth: true
      // }
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('./components/loginBox.vue')
    // },
    {
      path: '/register',
      name: 'register',
      component: () => import('./components/registerCard.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router