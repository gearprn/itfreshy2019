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
        title: 'Dashboard',
        requiredAuth: true
      }
    },
    {
      path: '/friendlist',
      name: 'friend',
      component: friendListPage,
      meta: {
        title: 'Friendlist',
        requiredAuth: true
      }
    },
    {
      path: '/leaderboard',
      name: 'board',
      component: leaderBoardPage,
      meta: {
        title: 'Leaderboard',
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
        title: 'Register',
        requiredAuth: true,
        firstTimeLogin: true
      }
    },
    {
      path: '/qr',
      name: 'qrcodeCard',
      component: () => import('./components/qrcodeCard.vue'),
      meta: {
        title: 'QR Code',
        requiredAuth: true
      }
    },
    {
      path: '/qrScanner',
      name: 'qrcodeScanner',
      component: () => import('./components/qrcodeScanner.vue'),
      meta: {
        title: 'Scan QR',
        requiredAuth: true
      }
    },
    {
      path: '*',
      component: () => import('./views/404.vue')
    }
  ]
})


const DEFAULT_TITLE = "IT Freshy | 2019"
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

router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = `IT Freshy | ${to.meta.title}`
  } else {
    document.title = DEFAULT_TITLE    
  }
})

export default router
