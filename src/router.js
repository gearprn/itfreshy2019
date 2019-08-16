import Vue from 'vue'
import Router from 'vue-router'
import loginPage from './views/loginPage.vue'
import dashboardPage from './views/dashboardPage.vue'
import friendListPage from './views/friendListPage.vue'
import leaderBoardPage from './views/leaderBoardPage.vue'
import Cookies from 'js-cookie'
import store from './store.js'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: dashboardPage,
      alias: '/dashboard',
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/friendlist',
      name: 'friend',
      component: friendListPage,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/leaderboard',
      name: 'board',
      component: leaderBoardPage,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: loginPage,
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./components/profileCard.vue'),
      children: [
        {
          path: '/profile/:uid',
          component: () => import('./components/profileCard.vue')
        }
      ]
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
    if (token == null) {
      next({
        path: '/login',
        params: {
          nextUrl: to.fullPath
        }
      })
    } else if (to.matched.some(record => record.meta.firstTimeLogin)) {
      if (store.getters.getFirstTime === true) {
        next()
      } else {
        // console.log(to.fullPath)
        next({
          path: '/dashboard',
          params: {
            nextUrl: to.fullPath
          }
        })
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
