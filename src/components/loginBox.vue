<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <button @click="login()">Login With Facebook</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BootstrapVue from 'bootstrap-vue'
import firebase from 'firebase'
import axios from 'axios'

var provider = new firebase.auth.FacebookAuthProvider();

export default {
    name: "loginBox",
    data () {
        return {
            facebookToken: null
        }
    },
    methods: {
        login() {
            firebase.auth().signInWithPopup(provider).then(function(result) {
                var token = result.credential.accessToken;
                var user = result.user;
                // console.log(token)
                // console.log(user)
                // console.log(user.uid)
                axios({
                    method: "POST",
                    url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/auth/client",
                    data: {
                        "uid": user.uid
                    }
                })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
            }).catch(function(error) {
                console.log(error.code)
                console.log(error.message)
                var errorCode = error.code;
                var errorMessage = error.message;
                
                var email = error.email;
                var credential = error.credential;
            });
        },
        logout() {
            firebase.auth().signOut().then(function() {
                console.log('logout successful!')
            }).catch(function(error){
                console.log(error)
            })
        }
    }
}
</script>

<style>

</style>
