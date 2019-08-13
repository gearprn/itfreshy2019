import Vue from 'vue'
import Vuex from 'vuex'
// import axios from "axios"
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

Vue.use(Vuex)

export default new Vuex.Store({
  base: process.env.NODE_ENV,
  state: {
    user: ""
  },
  getters: {
    getUser: (state) => {
      return this.user
    }
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
    } 
  },
  actions: {

  },
  plugins: [createPersistedState({
    key: 'ophkmitl',
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 1, secure: false, }),
      removeItem: key => Cookies.remove(key)
    },
  })],
})
