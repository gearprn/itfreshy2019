<template>
  <b-container fluid class="leaderboard">
    <h2 class="title">LEADERBOARD</h2>

    <transition name="fade" mode="out-in" appear>
      <b-container class="justify-content-center p-3" v-if="loading">
        <b-spinner variant="light" style="width:5rem;height:5rem;"></b-spinner>
      </b-container>

      <b-container v-if="this.error != ''">
        <h3>{{ this.error }}</h3>
      </b-container>
      <b-container v-else>
        <b-row class="box text-left">
          <b-col md="12" sm="12">
            <h4 class="mt-3 mb-3 title-leader" style="height: 1.5em;">ลำดับผู้ที่ล่ารายชื่อได้เยอะที่สุด</h4>
            <hr>
            <div class="m-3" style="background: white" v-for="(person, index) in leaderboard.board" :key="index">
              <p style="color:black;">ลำดับที่ {{index+1}}  {{person.userData.id}} | {{person.userData.name}} | {{person.userData.amountOf.sum}} คน</p>
            </div>
          </b-col>
          <b-col md="4" sm="12">
            <div class="m-3" style="background: white">
              <p style="color:black;"> คุณอยู่ลำดับที่ {{ yourPosition.position }}</p>
            </div>
          </b-col>
        </b-row>
      </b-container>

    </transition>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookies from 'js-cookie'
import axios from 'axios'

export default {
  name: "leaderBoardPage",
  components: {},
  data () {
    return {
      leaderboard: "",
      yourPosition: "",
      error: "",
      loading: true
    }
  },
  methods: {
    ...mapGetters([
      'getProfile', 'checkLogined'
    ]),
  },
  mounted() {
    this.loading = true
    let profile = this.getProfile()
    // console.log(profile)
    if (profile.year !== '1') {
      this.$router.push('/dashboard')
    }
    axios({
      method: "GET",
      url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/leaderboard",
      headers: {
        "authorization" : "Bearer " + Cookies.get('token')
      }
    })
    .then((res) => {
      this.loading = false
      // console.log("success")
      // console.log(res.data)
      if (res.statusCode === 401) {
        if (res.message === "Permission fail") {
          this.error = "คุณไม่มีสิทธิเข้าถึง"
        }
      } else {
        this.leaderboard = res.data
        this.yourPosition = res.data.myPosition
      }
    })
    .catch((err) => {
      // console.log(err)
      this.error = err
    })
  }
};
</script>

<style lang="scss" scoped>
.title-leader{
    background-image: -webkit-gradient( linear, left top, right top, color-stop(0, #FF8C04), color-stop(1, #202020) );
    background-image: gradient( linear, left top, right top, color-stop(0, #FF8C04), color-stop(1, #202020) );
    color:transparent;
    -webkit-background-clip: text;
    background-clip: text;
}

.leaderboard {
  min-height: calc(100vh - 56px);
}

.profile-img {
  width: 160px;
  height: 160px;
  border: 0;
  border-radius: 120px;
}
</style>
