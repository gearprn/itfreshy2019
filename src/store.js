import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  base: process.env.NODE_ENV,
  state: {
    profile: {},
    firstTime: true
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
    }
  },
  actions: {

  }
})

export default store
