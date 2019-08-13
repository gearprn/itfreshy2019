<template>
<div>
  <b-navbar toggleable="md" type="dark" variant="">
    <div class="container">
      <b-navbar-brand href="">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="gotoHome">หน้าหลัก</b-nav-item>
          <b-nav-item @click="logout" v-if="alreadyLogin === true">Logout</b-nav-item>
          <!-- <b-nav-item href="https://oph2019-kmitl-c2dac.web.app/register" v-if="this.getLoginState() === false">ลงทะเบียน</b-nav-item> -->
          <!-- <b-nav-item v-if="this.getLoginState() === false" @click="login()">เข้าสู่ระบบ</b-nav-item>
          <b-nav-item v-if="this.getLoginState() === true" @click="gotoDashboard()"> ข้อมูลของคุณ </b-nav-item>
          <b-nav-item v-if="this.getLoginState() === true" @click="gotoWorkshop()"> สมัครเข้าร่วมกิจกรรม </b-nav-item>
          <b-nav-item v-if="this.getLoginState() === true" @click="logout()">ออกจากระบบ</b-nav-item> -->
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
  <!-- <div class="container-fluid mt-3">
    <img src="http://openhouse.kmitl.ac.th/2019/wp-content/uploads/2019/07/cropped-Final-KMITL-60th-Open-house-209x154.png">
  </div> -->

  <div v-if="showModal">
    <transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">

        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title req-field">เเจ้งเตือน</h5>
                    <button  class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModal = false">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>{{ modalmsg }}</p>
                </div>
            </div>
        </div>

        </div>
    </div>
    </transition>
</div>

</div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import { mapGetters } from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'
import firebase from "firebase"

Vue.use(BootstrapVue)

var provider = new firebase.auth.FacebookAuthProvider();

export default {
  name: 'NavCard',
  data () {
    return {
      showModal: false,
      modalmsg: "",
      alreadyLogin: Cookies.get('token') != null
    }
  },
  methods: {
    // ...mapGetters([
    //   'getUsername',
    //   'getLoginState',
    //   'getToken'
    // ]),
    // logout() {
    //   this.showModal = true
    //   this.modalmsg = "กรุณารอซักครู่ ระบบกำลังออกจากระบบให้คุณ"
    //   axios({
    //     method: "DELETE",
    //     url: "https://us-central1-oph2019-kmitl-c2dac.cloudfunctions.net/auth/logout",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     data: {
    //       token: this.getToken()
    //     }
    //   })
    //   .then((res) => {
    //     this.showModal = false
    //     this.$router.push('/logout')
    //   })
    //   .catch((err) => {
    //     // console.log(err)
    //   })
    // },
    // gotoDashboard() {
    //   this.$router.push('/dashboard')
    // },
    // gotoWorkshop() {
    //   this.$router.push('/workshop')
    // },
    // login(){
    //   this.$router.push('/login')
    // }
    logout() {
      firebase
        .auth()
        .signOut()
        .then(function() {
          console.log("logout successful!");
          Cookies.remove('token')
        })
        .catch(function(error) {
          console.log(error);
        });

        this.alreadyLogin = false
        this.$router.push('/login')
    },
    gotoHome() {
      this.$router.push('/dashboard')
    }
  }
}

</script>

<style type="text/css" scoped>
.modal-title {
    color: #ee4b23;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .9s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.navbar {
  background: #ee4b23;
}

.navbar-dark .navbar-nav .nav-link {
    color: rgba(255,255,255,1);
}

.navbar-dark:hover .navbar-nav:hover .nav-link:hover {
    color: rgba(255,255,255,.5);
}

</style>
