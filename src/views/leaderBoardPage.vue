<template>
  <b-container fluid class="leaderboard">
    <h2 class="title">LEADERBOARD</h2>
    <b-container>
      <b-row class="box text-left">
        <b-col md="12" sm="12">
          <h4 class="mt-3 mb-3 title-leader" style="height: 1.5em;color:black;">ลำดับผู้ที่ล่ารายชื่อได้เยอะที่สุด</h4>
          <hr>
          <b-row class="justify-content-center py-5" v-if="loading">
            <b-spinner variant="dark" label="Loading..." style="width:5rem;height:5rem;"></b-spinner>
          </b-row>
          <b-row v-if="this.error != ''">
            <h3>{{ this.error }}</h3>
          </b-row>

          
            <!-- <div class="m-3" style="background: white" v-for="(person, index) in leaderboard.board" :key="index">
              <p style="color:black;">ลำดับที่ {{index+1}}  {{person.userData.id}} | {{person.userData.name}} | {{person.userData.amountOf.sum}} คน</p>
            </div> -->
          <b-table striped hover :items="this.board" v-else></b-table>
        </b-col>
        <b-col md="4" sm="12" v-if="yourPosition">
          <div class="m-3" style="background: white">
            <p style="color:black;"> คุณอยู่ลำดับที่ {{ yourPosition.position }}</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
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
      board: [],
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
    axios({
      method: "GET",
      url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/leaderboard",
      headers: {
        "authorization" : "Bearer " + Cookies.get('token')
      }
    })
    .then((res) => {
      console.log(res)
      this.loading = false
      // console.log("success")
      // console.log(res.data)
      if (res.statusCode === 401) {
        if (res.message === "Permission fail") {
          this.error = "คุณไม่มีสิทธิเข้าถึง"
        }
      } else {
        this.leaderboard = res.data
        res.data.board.forEach((d_, index) => {
          let arr = {
            "ลำดับที่": index + 1,
            "รหัสนักศึกษา": d_.userData.id,
            "ชื่อ-นามสกุล": d_.userData.name,
            "ชื่อเล่น": d_.userData.nickname,
            "จำนวนชื่อที่ล่าได้": d_.userData.amountOf.sum
          }
          this.board.push(arr)
        })

        console.log(this.board)


        if (res.data.yourPosition !== "You are not the first year." && res.data.yourPosition != null) {
          this.yourPosition = res.data.myPosition
        } else {
          this.yourPosition = null
        }
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
.title {
  background-image: -webkit-gradient(120deg, #f6d365 0%, #fda085 100%);;
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
}

.leaderboard {
  min-height: calc(100vh - 142px);
}

.profile-img {
  width: 160px;
  height: 160px;
  border: 0;
  border-radius: 120px;
}

table {
  color: black;
}
</style>
