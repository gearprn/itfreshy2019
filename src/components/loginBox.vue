<template>
  <div class="login">
    <b-container fluid>
      <b-row class="justify-content-center m-5">
        <b-img-lazy src="https://via.placeholder.com/240?text=Logo+240x240"></b-img-lazy>
      </b-row>
      <b-row class="justify-content-md-center p-3">
        <b-col md='3' sm='12'>
          <b-button class="fb-btn" @click="login()">Login With Facebook</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Vue from "vue";
import firebase from "firebase";
import axios from "axios";
import { mapMutations, mapGetters } from 'vuex'
import Cookies from "js-cookie";

var provider = new firebase.auth.FacebookAuthProvider();

export default {
  name: "loginBox",
  data() {
    return {
      facebookToken: null
    };
  },
  methods: {
    login() {
      let router = this.$router
      let store = this.$store
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          // console.log(token)
          // console.log(user.photoURL)
          // console.log(user)
          // console.log(user.uid)
          axios({
            method: "POST",
            url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/auth/client",
            headers: {
              "facebook-id": user.uid
            }
          })
          .then(res => {
            console.log(res.data);
            console.log(user)
            Cookies.set('token', res.data.token, { expires: 1, secure: false, });
            // Cookies.set('photoURL', user.photoURL, { expires: 1, secure: false, });
            // Cookies.set('email', user.email, { expires: 1, secure: false, });
            store.commit('setPhotoURL', user.photoURL)
            store.commit('setEmail', user.email)

            if (res.data.firstTime) {
              store.commit('setFirstTime', true)
              router.push('/register')
            }
            else {
              axios({
                method: "GET",
                url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/user/myprofile",
                headers: {
                  "authorization" : "Bearer " + Cookies.get('token')
                }
              })
              .then((res) => {
                console.log(res.data)
                store.commit('setUser', res.data)
              })
              .catch((err) => {
                console.log(err)
              })
              router.push('/dashboard')
            }
          })
          .catch(err => {
            console.log(err);
          });
        })
        .catch(function(error) {
          console.log(error.code);
          console.log(error.message);
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          console.log("logout successful!");
          Cookies.remove('token')
          Cookies.remove('photoURL')
          Cookies.remove('email')
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
.fb-btn {
  background-color: #4267b2;
}
</style>
