<template>
  <b-container fluid class="qrcode">
    <b-container>
      <b-row style="justify-content: center;" class="m-3" v-if="qrcode != ''">
        <img center alt="Center image" :src="qrcode" />
      </b-row>
      <b-row class="justify-content-center" v-else>
        <b-spinner style="width:3rem;height:3rem;"></b-spinner>
      </b-row>
    </b-container>
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

<style lang="scss">
</style>
