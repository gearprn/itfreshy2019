<template>
  <b-container class="dashboard">
    <b-container fluid v-if="loading" class="mt-3 mb-5">
      <h2 style="word-wrap: break-word">สวัสดี คุณ {{ this.getProfile().name }}</h2>
      <b-container class="mt-3 mb-3">
        <b-img-lazy :src="`${this.getProfile().photoURL}?type=large`" class="profile-img"></b-img-lazy>
      </b-container>
      <b-container>
        <h4>({{ this.getProfile().nickname }})</h4>
        <h5>{{ this.getProfile().id }} | {{ this.getProfile().branch }}</h5>
      </b-container>
      <b-container class="mt-3" fluid>
        <h4>จำนวนยอดเพื่อน/รุ่นพี่ที่สแกน QR code ไปแล้ว</h4>
        <b-table>
        </b-table>
      </b-container>
    </b-container>
    <b-container v-else class="mt-5 mb-5">
      <b-spinner style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
    </b-container>
  </b-container>
</template>

<script>
import { getters, mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import axios from 'axios'

export default {
  name: "dashboardPage",
  components: {},
  data () {
    return {
      token: Cookies.get('token'),
      profile: "",
      loading: false
    }
  },
  methods: {
    ...mapGetters([
      'getProfile'
    ])
  },
  mounted() {
    let profile = this.$store.getters.getProfile
    // console.log(profile)
    // console.log(Object.keys(profile).length == 0)
    if (this.token != null && Object.keys(profile).length == 0) {
      axios({
        method: "GET",
        url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/user/myprofile",
        headers: {
          "authorization" : "Bearer " + Cookies.get('token')
        }
      })
      .then((res) => {
        // console.log(res)
        this.$store.commit('setProfile', res.data)
        this.profile = res.data
        this.loading = true
      })
      .catch((err) => {
        console.log(err)
        this.$router.push('/login')
      })
    } else if (this.token != null) {
      this.profile = profile
      this.loading = true
    } else {
      this.$router.push('/login')
    }
    // console.log(this.profile)
  },
  methods: {
    initializeProfile() {
      
    }
  }
};
</script>

<style lang="scss">
.profile-img {
  width: 160px;
  height: 160px;
  border: 0;
  border-radius: 120px;
}
</style>