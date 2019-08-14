<template>
  <b-container fluid class="qrcode">
    <b-container>
      <b-row style="justify-content: center;" class="m-3">
        <qrcode-stream @decode="onDecode"></qrcode-stream>
        <h3>{{ result }}</h3>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
import { getters, mapGetters, mapActions } from "vuex";
import Cookies from "js-cookie";
import { db } from "../main";
import axios from "axios";

export default {
  name: "qrcode",
  components: {
    QrcodeStream
  },
  data() {
    return {
      qrcode: "132",
      result: "",
      error: ""
    };
  },
  methods: {
    ...mapGetters([
      'checkLogined'
    ]),
    ...mapActions([
      'loginWithToken'
    ]),
    onDecode(result) {
      this.result = result;
      axios({
        method: "POST",
        url:
          "https://us-central1-itfreshy2019.cloudfunctions.net/api/user/myprofile",
        headers: {
          authorization: "Bearer " + Cookies.get("token")
        },
        data: {
          encoded: result
        }
      });
    }
  },
  mounted() {
    if (!this.checkLogined()) {
      this.loginWithToken(Cookies.get('token'))
        .catch((err) => {
          console.log(err)
          this.$router.push('/login')
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>