<template>
  <b-container fluid class="friendlist">
    <h2 class="title mb-3">Friend List</h2>
    <b-container class="box">
      <b-row>
        <b-col md="4" sm="12" v-for="friend in friendlist">
          <div class="card m-3 p-2 friend-card" @click="gotoProfile(friend.uid)">
            <div class="friend-image p-3">
              <img :src="friend.photoURL + '?type=large'">
            </div>
            <h5>{{friend.name}}</h5>
            <h6><{{friend.nickname}}></h6>
            <span style="word-wrap: break-word;">{{friend.bio}}</span>
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
    gotoProfile(uid) {
      this.$router.push(`/profile/${uid}`)
    }
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
.friendlist {
  min-height: calc(100vh - 72px);
}

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

.friend-card {
  color: #000;
  background: rgb(253,253,253);
  background: linear-gradient(180deg, rgba(253,253,253,1) 0%, rgba(250,250,250,1) 30%, rgba(235,235,235,1) 100%);
  border: 0;
  border-radius: 4px;
  box-shadow: 1px 1px 3px 0 #AFAFAF;
  cursor: pointer;
  .friend-image > img {
    width: 100%;
    max-width: 180px;
  }
}
</style>
