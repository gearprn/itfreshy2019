import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase';
import Cookies from 'js-cookie'
import { isNull } from 'util';

Vue.use(Vuex)

let store = new Vuex.Store({
  base: process.env.NODE_ENV,
  mode: 'history',
  state: {
    profile: {},
    firstTime: false,
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
        logined = Object.keys(state.profile).length > 2
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
    }
  },
  actions: {
    loginWithFB({ commit, state }) {
      let provider = new firebase.auth.FacebookAuthProvider();
      return new Promise((resolve, reject) => {
        firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          let token = result.credential.accessToken;
          let user = result.user;

          axios({
            method: "POST",
            url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/auth/client",
            headers: {
              "facebook-id": user.uid
            }
          })
          .then((res) => {
            // console.log(res.data);
            let token_ = res.data.token
            Cookies.set('token', token_, { expires: 5, secure: false, });
            commit('setPhotoURL', user.photoURL)
            commit('setEmail', user.email)

            if (res.data.firstTime) {
              commit('setFirstTime', true)
              resolve('register')
            } else {
              axios({
                method: "GET",
                url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/user/myprofile",
                headers: {
                  "authorization" : "Bearer " + token_
                }
              })
              .then((res) => {
                commit('setProfile', res.data)
                resolve('dashboard')
              })
              .catch((err) => {
                reject(err)
              })
            }
          })
          .catch((err) => {
            reject(err)
          });
        })
        .catch((err) => {
          reject(err)
        });
      })
    },
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
            if (res.data.id == null) {
              reject('Doesn\'t register')
            }
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
    },
    getProfileByUid({ commit, state }, uid) {
      return new Promise((resolve, reject) => {
        if (uid == null) reject("Invaild UID")
        else {
          axios({
            method: "GET",
            url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/user/profile",
            headers: {
              "uid" : uid
            }
          })
          .then((res) => {
            if (res.data.statusCode != 200) {
              reject(res.data.statusCode + "|" + res.data.message)
            }
            resolve(res.data)
          })
          .catch((err) => {
            reject(err)
          })
        }
      })
    }
  }
})

export default store
