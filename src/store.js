import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
  base: process.env.NODE_ENV,
  mode: 'history',
  state: {
    profile: {},
    firstTime: true,
  },
  getters: {
    getProfile: (state) => {
      return state.profile
    },
    getUser: (state) => {
      return state.profile.user
    },
    getPhotoURL: (state) => {
      return state.profile.photoURL
    },
    getEmail: (state) => {
      return state.profile.email
    },
    getFirstTime: (state) => {
      return state.firstTime
    },
    checkLogined: (state) => {
      let logined = false
      if (state.profile != null) {
        logined = Object.keys(state.profile).length != 0
      }
      return logined
    }
  },
  mutations: {
    setProfile: (state, profile) => {
      state.profile = profile
    },
    setUser: (state, user) => {
      state.profile.user = user
    },
    setPhotoURL: (state, url) => {
      state.profile.photoURL = url
    },
    setEmail: (state, email) => {
      state.profile.email = email
    },
    setFirstTime: (state, bool) => {
      state.firstTime = bool
    },
    clearProfile: (state) => {
      state.profile = {}
      console.log(state.profile)
    }
  },
  actions: {
    loginWithToken({ commit, state }, token) {
      return new Promise((resolve, reject) => {
        if (token == null) reject("Invaild Token")
        else if (Object.keys(state.profile).length == 0) {
          axios({
            method: "GET",
            url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/user/myprofile",
            headers: {
              "authorization" : "Bearer " + token
            }
          })
          .then((res) => {
            commit('setProfile', res.data)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
        } else {
          resolve(state.profile)
        } 
      })
    }
  }
})

export default store
