<template>
<div>
  <b-navbar toggleable="md" type="dark" variant="">
    <div class="container">
      <b-navbar-brand href="">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" v-if="this.checkLogined()" ></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto"  v-if="this.checkLogined()">
          <b-nav-item @click="gotoHome">My Profile</b-nav-item>
          <b-nav-item @click="gotoMyQr">My QR Code</b-nav-item>
          <b-nav-item @click="gotoScanner">QR Scanner</b-nav-item>
          <b-nav-item @click="gotoFriendList">Friend List</b-nav-item>
          <b-nav-item @click="gotoleaderBoard" v-if="this.getProfile().year =='1'">Leaderboard</b-nav-item>
          <b-nav-item @click="logout">Logout</b-nav-item>
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
import { mapGetters, mapMutations, mapActions } from 'vuex'
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
      alreadyLogin: false,
      token: Cookies.get('token')
    }
  },
  methods: {
    ...mapGetters([
      'checkLogined', 'getProfile'
    ]),
    ...mapMutations([
      'clearProfile', 'setProfile'
    ]),
    ...mapActions([
      'loginWithToken'
    ]),
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // console.log("logout successful!")
          Cookies.remove('token')
          this.clearProfile()
        })
        .catch((err) => {
          console.log(err);
        });

        this.alreadyLogin = false
        this.gotoLogin()
    },
    gotoHome() {
      let profile = this.getProfile()
      console.log
      axios({
        method: "GET",
        url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/user/myprofile",
        headers: {
          "authorization" : "Bearer " + this.token
        }
      })
      .then((res) => {
        this.setProfile(res.data)
        this.$router.push('/dashboard')
      })
      // this.$router.push('/dashboard')
    },
    gotoMyQr() {
      this.$router.push('/qr')
    },
    gotoScanner() {
      this.$router.push('/qrScanner')
    },
    gotoLogin() {
      this.$router.push('/login')
    },
    gotoFriendList() {
      this.$router.push('/friendlist')
    },
    gotoleaderBoard() {
      this.$router.push('/leaderboard')
    }
  },
  mounted() {
    if (!this.checkLogined()) {
      this.loginWithToken(Cookies.get('token'))
        .catch((err) => {
          console.log(err)
          if (err == "Doesn't register") {
            this.logout()
          } else if (this.$route.name != 'login') {
            this.$router.push('/login')
          }
        })
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
  background: none;
}

.navbar-dark .navbar-nav .nav-link {
    color: rgba(255,255,255,1);
}

.navbar-dark:hover .navbar-nav:hover .nav-link:hover {
    color: rgba(255,255,255,.5);
}

</style>
