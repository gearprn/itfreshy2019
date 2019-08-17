<template>
  <b-container fluid class="qrcode">
    <h2 class="title mb-3">QR code</h2>
    <transition name="fade" mode="out-in" appear>
      <b-container class="justify-content-center p-3" v-if="qrcode === ''" key="loading">
        <b-spinner variant="light" style="width:5rem;height:5rem;"></b-spinner>
      </b-container>
      <b-container class="box" v-else key="shown">
        <b-row style="justify-content: center;" class="m-3 p-3">
          <img center class="qrcode-img" alt="Center image" :src="qrcode" />
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
.qrcode {
  min-height: calc(100vh - 72px);
}
.qrcode-img {
  width: 240px;
  height: 240px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-to
/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
