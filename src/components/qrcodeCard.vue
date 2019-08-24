<template>
  <b-container fluid class="qrcode">
    <h2 class="mb-3">
      <span class="title">QR code</span>
    </h2>
    <transition name="fade" mode="out-in" appear>
      <b-container class="justify-content-center p-3" v-if="qrcode === ''" key="loading">
        <b-spinner variant="light" style="width:5rem;height:5rem;"></b-spinner>
      </b-container>
      <b-container class="box" v-else key="shown">
        <b-row style="justify-content: center;" class="m-3 py-3">
          <img center class="qrcode-img" alt="Center image" :src="qrcode" />
        </b-row>
        <hr>
        <b-row style="justify-content: center;" class="p-3">
          <router-link class="btn btn-dark bg-salmon w-75" tag="button" to="/scan">Go to Scanner</router-link>
        </b-row>
      </b-container>
    </transition>
  </b-container>
</template>

<script>
import QRcode from "qrcode";
import Cookies from "js-cookie";
import { mapGetters, mapActions } from "vuex";
import { db } from "../main";

export default {
  name: "qrcode",
  components: {},
  data() {
    return {
      qrcode: ""
    };
  },
  methods: {
    ...mapGetters([
      'getProfile', 'checkLogined'
    ]),
    ...mapActions([
      'loginWithToken'
    ]),
    update() {
      let profile = this.getProfile()
      var docRef = db.collection("users").doc(profile.uid)
      docRef.onSnapshot(doc => {
        // console.log(doc.data().qrCode.counter)
        QRcode.toDataURL(doc.data().qrCode.encoded)
          .then(url => {
            // console.log(url);
            this.qrcode = url;
          })
          .catch(err => {
            // console.log(err);
          });
      });
    }
  },
  mounted() {
    if (!this.checkLogined()) {
      this.loginWithToken(Cookies.get('token'))
        .then(() => {
          this.update();
        })
        .catch((err) => {
          console.log(err)
          this.$router.push('/login')
        })
    } else {
      this.update();
    }
  }
};
</script>

<style lang="scss" scoped>
.bg-salmon{
    background: #FF7B7B !important;
    border: 0 !important;
    padding: .7em 1em .7em 1em !important;
}

.title {
  background-image: linear-gradient(to top, #c471f5 0%, #fa71cd 100%);
}

.qrcode {
  min-height: calc(100vh - 142px);
}

.qrcode-img {
  min-width: 120px;
  min-height: 120px;
  max-width: 240px;
  max-height: 240px;
}

@media (min-width: 0px) and (max-width: 480px) {
  .qrcode-img {
    width: 50vw;
    height: 50vw;
  }
}

@media (min-width: 481px) and (max-width: 767px) {
  .qrcode-img {
    width: 35vw;
    height: 35vw;
  }
}

@media (min-width: 768px) {
  .qrcode-img {
    width: 20vw;
    height: 20vw;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-to
/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
