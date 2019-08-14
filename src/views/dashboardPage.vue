<template>
  <b-container class="dashboard">
    <b-container fluid v-if="loading" class="mt-3 mb-5">
      <h2 style="word-wrap: break-word">สวัสดี คุณ {{ this.getProfile().name }}</h2>
      <b-container class="mt-3 mb-3">
        <b-img-lazy :src="`${this.getProfile().photoURL}?type=large`" class="profile-img"></b-img-lazy>
      </b-container>
      <b-container>
        <h4><{{ this.getProfile().nickname }}></h4>
        <h5>{{ this.getProfile().id }} | {{ this.getProfile().branch }}</h5>
      </b-container>
      <b-container class="mt-3 p-4" fluid>
        <b-container class="p-3 overall">
          <h4>จำนวนเพื่อน/รุ่นพี่ที่สแกน QR code ไปแล้ว</h4>
          <h4>ทั้งหมด <h3 style="display: inline">{{ this.getProfile().amountOf.sum }}</h3> คน</h4>
          <b-container class="mt-4">
            <b-row class="justify-content-center">
              <b-col>รุ่น 17</b-col>
              <b-col>รุ่น 16</b-col>
              <b-col>รุ่น 15</b-col>
              <b-col>รุ่น 14</b-col> 
            </b-row>
            <b-row class="justify-content-center">
              <b-col>{{ this.getProfile().amountOf.year1 }}</b-col>
              <b-col>{{ this.getProfile().amountOf.year2 }}</b-col>
              <b-col>{{ this.getProfile().amountOf.year3 }}</b-col>
              <b-col>{{ this.getProfile().amountOf.year4 }}</b-col> 
            </b-row>
          </b-container>
        </b-container>
      </b-container>
    </b-container>
    <b-container v-else class="mt-5 mb-5">
      <b-spinner style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
    </b-container>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookies from 'js-cookie'
import axios from 'axios'

export default {
  name: "dashboardPage",
  components: {},
  data () {
    return {
      token: Cookies.get('token'),
      profile: "",
      loading: false,
      error: ""
    }
  },
  methods: {
    ...mapGetters([
      'getProfile'
    ]),
    ...mapActions([
      'loginWithToken'
    ])
  },
  mounted() {
    let profile = this.getProfile()
    console.log(profile)
    // console.log(Object.keys(profile).length == 0)
    this.loginWithToken(this.token)
      .then((res) => {
        this.profile = res.data
        this.loading = true
      })
      .catch((err) => {
        console.log(err)
        this.$router.push('/login')
      })
  },
};
</script>

<style lang="scss" scoped>
.overall {
  width: 80%;
  background-color: #FFF;
}

.profile-img {
  width: 160px;
  height: 160px;
  border: 0;
  border-radius: 120px;
}
</style>