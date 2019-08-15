<template>
  <b-container fluid class="leaderboard">
    <b-container>
      <b-row>
        <b-col md="4" sm="12" v-for="persone in leaderboard.board">
          <div class="card m-3" style="background: white">
            <p>{{persone.userData.id}} {{persone.userData.name}}</p>
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
      yourPosition: null
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
      console.log(res.data)
      this.leaderboard = res.data
      this.yourPosition = res.data.myPosition
    })
    .catch((err) => {
      console.log(err)
    })
  }
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
