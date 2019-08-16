<template>
  <b-container fluid class="qrcode">
    <h2 class="title mb-3">Scan QR</h2>
    <b-container class="box pt-1 pb-1">
      <b-row style="justify-content: center;" class="m-3">
        <b-col class="justify-content-center" md="12" sm="12">
          <qrcode-stream v-if="showScanner == true" @decode="onDecode"></qrcode-stream>
        </b-col>
        <b-col v-if="showScanner != true" class="justify-content-center"  md="12" sm="12">
          <h3>ไหนเพื่อนหรือพี่ที่เราสเเกนไปชื่ออะไร</h3>
        </b-col>
        <b-col v-if="showScanner != true" md="4" sm="12" v-for="name in choice">
          <button class="btn btn-primary m-2 w-100" @click="addFriend(name)">{{ name }}</button>
        </b-col>
      </b-row>

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
      error: "",
      showScanner: true,
      showModal: false,
      modalmsg: "",
      friendUid: "",
      choice: []
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
      // this.modalmsg = "กรุณารอซักครู่"
      this.result = result;
      axios({
        method: "POST",
        url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/friend/quiz",
        headers: {
          "authorization" : "Bearer " + Cookies.get('token')
        },
        data: {
          "encoded": result
        }
      })
      .then((res) => {
        console.log(res.data)
        if (!res.data.status) {
          this.showScanner = true
          this.showModal = true
          this.modalmsg = "QR code หมดอายุเเล้วจ้า"
        } else {
          this.showScanner = false
          this.friendUid = res.data.data.friend
          this.choice = res.data.data.choice
        }
      })
      .catch((err) => {
        console.log(err)
      })
    },
    addFriend(name) {
      console.log(name)
      axios({
        method: "POST",
        url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/friend/add",
        headers: {
          "authorization" : "Bearer " + Cookies.get('token')
        },
        data: {
          answer: name,
          friend: this.friendUid
        }
      })
      .then((res) => {
        console.log(res.data.message)
        if (res.data.message == "Incorrect answer") {
          this.showScanner = true
          this.showModal = true
          this.modalmsg = "ตอบผิดไปสเเกนใหม่นะ"
        } else if (res.data.message == "Already Add") {
          this.showScanner = true
          this.showModal = true
          this.modalmsg = "มีรายชื่อเพื่อนคนนี้เเล้ว"
        } else if (res.data.message == "User Not found") {
          this.showScanner = true
          this.showModal = true
          this.modalmsg = "QR code ไม่ถูกต้อง"
        }
        else {
          this.showScanner = true
          this.showModal = true
          this.modalmsg = "เพิ่มเพื่อนเรียบร้อย"
        }
      })
      .catch((err) => {
        console.log(err)
      })
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
.qrcode {
  min-height: calc(100vh - 72px);
}

.error {
  font-weight: bold;
  color: red;
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
</style>
