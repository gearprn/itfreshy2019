import Vue from 'vue'
import Vuex from 'vuex'
// import axios from "axios"
// import createPersistedState from 'vuex-persistedstate';
// import Cookies from 'js-cookie';

Vue.use(Vuex)

let store = new Vuex.Store({
  base: process.env.NODE_ENV,
  state: {
    profile: {
      user: "",
      photoURL: "",
      email: ""
    },
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
  // plugins: [createPersistedState({
  //   key: 'ophkmitl',
  //   storage: {
  //     getItem: key => Cookies.get(key),
  //     setItem: (key, value) => Cookies.set(key, value, { expires: 1, secure: false, }),
  //     removeItem: key => Cookies.remove(key)
  //   },
  // })],
})

export default store
