<template>
  <div class="login">
    <b-container fluid>
      <b-row class="justify-content-center mt-5">
        <b-col md="4" sm="12">
          <img class="w-100" src="../assets/freshy-logo.png"></img>
        </b-col>
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
import firebase from "firebase";
import axios from "axios";
import { mapMutations, mapGetters, mapActions } from 'vuex'
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
    ...mapActions([
      'loginWithFB'
    ]),
    login() {
      let response_ = ""
      this.loginWithFB()
      .then((res) => {
        response_ = res
        if (response_ === 'dashboard') { 
          this.gotoHome()
        } else if (response_ === 'register') {
          this.gotoRegister()
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    // login() {
    //   let router = this.$router
    //   let store = this.$store
    //   firebase
    //     .auth()
    //     .signInWithPopup(provider)
    //     .then(function(result) {
    //       var token = result.credential.accessToken;
    //       var user = result.user;
    //       // console.log(token)
    //       // console.log(user.photoURL)
    //       // console.log(user)
    //       // console.log(user.uid)
    //       axios({
    //         method: "POST",
    //         url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/auth/client",
    //         headers: {
    //           "facebook-id": user.uid
    //         }
    //       })
    //       .then(res => {
    //         // console.log(res.data);
    //         Cookies.set('token', res.data.token, { expires: 5, secure: true, });
    //         store.commit('setPhotoURL', user.photoURL)
    //         store.commit('setEmail', user.email)
    //         if (res.data.firstTime) {
    //           store.commit('setFirstTime', true)
    //           router.push('/register')
    //         }
    //         else {
    //           axios({
    //             method: "GET",
    //             url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/user/myprofile",
    //             headers: {
    //               "authorization" : "Bearer " + Cookies.get('token')
    //             }
    //           })
    //           .then((res) => {
    //             store.commit('setProfile', res.data)
    //             router.push('/dashboard')
    //           })
    //           .catch((err) => {
    //             console.log(err)
    //           })
    //         }
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //     })
    //     .catch(function(error) {
    //       console.log(error.code);
    //       console.log(error.message);
    //       var errorCode = error.code;
    //       var errorMessage = error.message;
    //       var email = error.email;
    //       var credential = error.credential;
    //     });
    // },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          // console.log("logout successful!");
          Cookies.remove('token')
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    gotoHome() {
      this.$router.push('/dashboard')
    },
    gotoRegister() {
      this.$router.push('/register')
    }
  }
};
</script>

<style lang="scss" scoped>
.fb-btn {
  background-color: #00bfff;
}

.btn-secondary {
  color: #fff;
  background-color: #00bfff;
  border-color: #00bfff;
}

.login {
  min-height: calc(100vh - 72px);
}
</style>
