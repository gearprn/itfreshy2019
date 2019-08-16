<template>
  <b-container fluid class="leaderboard">
    <h2 class="title">LEADERBOARD</h2>
    <b-container v-if="this.error != ''">
      <h3>{{ this.error }}</h3>
    </b-container>
    <b-container v-else>
      <b-row>
        <b-col md="4" sm="12" v-for="person in leaderboard.board">
          <div class="card m-3" style="background: white">
            <p>{{person.userData.id}} {{person.userData.name}}</p>
          </div>
        </b-col>
        <b-col md="4" sm="12">
          <div class="card m-3" style="background: white">
            <p>คุณอยู่ลำดับที่ {{ yourPosition.position }}</p>
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
      leaderboard: [],
      yourPosition: null,
      error: ""
    }
  },
  methods: {

  },
  mounted() {
    axios({
      method: "GET",
      url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/leaderboard",
      headers: {
        "authorization" : "Bearer " + Cookies.get('token')
      }
    })
    .then((res) => {
      console.log("success")
      console.log(res.data)
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
      console.log(err)
      this.error = err
    })
  }
};
</script>

<style lang="scss" scoped>
.leaderboard {
  min-height: calc(100vh - 72px);
}

.profile-img {
  width: 160px;
  height: 160px;
  border: 0;
  border-radius: 120px;
}
</style>
