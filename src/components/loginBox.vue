<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-sm-12">
                    <button @click="login()">Login With Facebook</button>
                    <button @click="logout()">logout With Facebook</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BootstrapVue from 'bootstrap-vue'
import firebase from 'firebase'

var provider = new firebase.auth.FacebookAuthProvider();

export default {
    name: "loginBox",
    methods: {
        login() {
            firebase.auth().signInWithPopup(provider).then(function(result) {
                var token = result.credential.accessToken;
                var user = result.user;
                console.log(token)
                console.log(user)

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
