<template>
  <b-container fluid class="qrcode">
    <b-container>
      <b-row class="justify-content-center" v-if="qrcode == null">
        <b-spinner style="width:3rem;height:3rem;"></b-spinner>
      </b-row>
      <b-row style="justify-content: center;" class="m-3" v-else>
        <img center alt="Center image" :src="qrcode" />
        <!-- <button @click="update()">hit</button> -->
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import QRcode from "qrcode";
import Cookies from "js-cookie";
import { mapGetters } from "vuex";
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
      'getProfile'
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
    this.update();
  }
};
</script>

<style lang="scss">
</style>