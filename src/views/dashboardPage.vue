<template>
  <b-container class="dashboard">
    <h2 style="word-wrap: break-word">สวัสดี คุณ {{ this.profile.name }}</h2>
    <b-container class="mt-3 mb-3">
      <b-img-lazy :src="`${this.profile.photoURL}?type=large`" class="profile-img"></b-img-lazy>
    </b-container>
    <b-container>
      <h4>({{ this.profile.nickname }})</h4>
      <h5>{{ this.profile.id }} | {{ this.profile.branch }}</h5>
    </b-container>
    <b-container class="mt-3" fluid>
      <h4>จำนวนยอดเพื่อน/รุ่นพี่ที่สแกน QR code ไปแล้ว</h4>
      <b-table>
      </b-table>
    </b-container>
  </b-container>
</template>

<script>
import { getters, mapGetters } from 'vuex'
import Cookies from 'js-cookie'

export default {
  name: "dashboardPage",
  components: {},
  data () {
    return {
      token: Cookies.get('token'),
      profile: ""
    }
  },
  mounted() {
    this.profile = this.$store.getters.getProfile
  
    console.log(this.profile)
  },
  methods: {
    
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