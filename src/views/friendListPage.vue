<template>
  <b-container fluid class="friendlist">
    <b-container>
      <b-row>
        <b-col md="4" sm="12" v-for="friend in friendlist">
          <div class="card m-3" style="background: white">
            <p>{{friend.name}}</p>
            <p>{{friend.nickname}}</p>
            <p>{{friend.bio}}</p>
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
  name: "friendListPage",
  components: {},
  data () {
    return {
      friendlist: []
    }
  },
  methods: {

  },
  mounted() {
    axios({
      method: "GET",
      url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/user/friendlist",
      headers: {
        "authorization" : "Bearer " + Cookies.get('token')
      }
    })
    .then((res) => {
      console.log(res.data)
      this.friendlist = res.data.friendList
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
