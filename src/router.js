import Vue from 'vue'
import Router from 'vue-router'
import loginPage from './views/loginPage.vue'
import dashboardPage from './views/dashboardPage.vue'
import Cookies from 'js-cookie'
import store from './store.js'

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
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./components/registerCard.vue'),
      meta: {
        requiredAuth: true,
        firstTimeLogin: true
      }
    },
    {
      path: '/qr',
      name: 'qrcodeCard',
      component: () => import('./components/qrcodeCard.vue'),
      meta: {
        requiredAuth: false
      }
    },
    {
      path: '/qrScanner',
      name: 'qrcodeScanner',
      component: () => import('./components/qrcodeScanner.vue'),
      meta: {
        requiredAuth: false
      }
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    let token = Cookies.get('token')
    if (to.matched.some(record => record.meta.firstTimeLogin)) {
      if (store.getters.getFirstTime) { 
        next()
      } else {
        console.log(to.fullPath)
        next({
          path: '/dashboard',
          params: {
            nextUrl: to.fullPath
          }
        })
      }
    } else if (token != null) {
      next()
    } else {
      next({
        path: '/login',
        params: {
          nextUrl: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router