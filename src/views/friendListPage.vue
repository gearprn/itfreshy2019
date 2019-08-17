<template>
  <b-container fluid class="friendlist">
    <h2 class="title mb-3">Friend List</h2>

    <transition name="fade" mode="out-in" appear>
      <b-container class="justify-content-center p-3" v-if="loading">
        <b-spinner variant="light" style="width:5rem;height:5rem;"></b-spinner>
      </b-container>

      <b-container class="box">
        <b-row>
          <b-col class="mt-3">
            <button class="btn btn-dark bg-salmon" @click="selectYear = 1">ปี 1</button>
          </b-col>
          <b-col class="mt-3">
            <button class="btn btn-dark bg-salmon" @click="selectYear = 2">ปี 2</button>
          </b-col>
          <b-col class="mt-3">
            <button class="btn btn-dark bg-salmon" @click="selectYear = 3">ปี 3</button>
          </b-col>
          <b-col class="mt-3">
            <button class="btn btn-dark bg-salmon" @click="selectYear = 4">ปี 4</button>
          </b-col>
        </b-row>
        <hr>
        
          <b-row>
            <b-col v-if="selectYear == 1" md="4" sm="12" v-for="(friend, index) in year_1" v-bind:key="index">
              <div class="card m-3 p-2 friend-card" @click="gotoProfile(friend.uid)">
                <div class="friend-image p-3">
                  <img :src="friend.photoURL + '?type=large'">
                </div>
                <h5>{{friend.name}}</h5>
                <h6><{{friend.nickname}}></h6>
                <span style="word-wrap: break-word;">{{friend.bio}}</span>
              </div>
            </b-col>
          

            <b-col v-if="selectYear == 2" md="4" sm="12" v-for="(friend, index) in year_2" v-bind:key="index">
              <div class="card m-3 p-2 friend-card" @click="gotoProfile(friend.uid)">
                <div class="friend-image p-3">
                  <img :src="friend.photoURL + '?type=large'">
                </div>
                <h5>{{friend.name}}</h5>
                <h6><{{friend.nickname}}></h6>
                <span style="word-wrap: break-word;">{{friend.bio}}</span>
              </div>
            </b-col>

            <b-col v-if="selectYear == 3" md="4" sm="12" v-for="(friend, index) in year_3" v-bind:key="index">
              <div class="card m-3 p-2 friend-card" @click="gotoProfile(friend.uid)">
                <div class="friend-image p-3">
                  <img :src="friend.photoURL + '?type=large'">
                </div>
                <h5>{{friend.name}}</h5>
                <h6><{{friend.nickname}}></h6>
                <span style="word-wrap: break-word;">{{friend.bio}}</span>
              </div>
            </b-col>

            <b-col v-if="selectYear == 4" md="4" sm="12" v-for="(friend, index) in year_4" v-bind:key="index">
              <div class="card m-3 p-2 friend-card" @click="gotoProfile(friend.uid)">
                <div class="friend-image p-3">
                  <img :src="friend.photoURL + '?type=large'">
                </div>
                <h5>{{friend.name}}</h5>
                <h6><{{friend.nickname}}></h6>
                <span style="word-wrap: break-word;">{{friend.bio}}</span>
              </div>
            </b-col>

            <div class="col-12 text-center mb-3" v-if="year_1.length == 0 && selectYear == 1">
              <p style="color:black;">ดูเหมือนว่าคุณจะยังไม่ได้ทำความรู้จักเพื่อนปี 1 เลยนะ</p>
              <router-link class="btn btn-dark bg-salmon w-75" tag="button" to="/qrScanner">สเเกนเลยสิ</router-link>
            </div>

            <div class="col-12 text-center mb-3" v-if="year_2.length == 0 && selectYear == 2">
              <p style="color:black;">ดูเหมือนว่าคุณจะยังไม่ได้ทำความรู้จักพี่ปี 2 เลยนะ</p>
              <router-link class="btn btn-dark bg-salmon w-75" tag="button" to="/qrScanner">สเเกนเลยสิ</router-link>
            </div>

            <div class="col-12 text-center mb-3" v-if="year_3.length == 0 && selectYear == 3">
              <p style="color:black;">ดูเหมือนว่าคุณจะยังไม่ได้ทำความรู้จักพี่ปี 3 เลยนะ</p>
              <router-link class="btn btn-dark bg-salmon w-75" tag="button" to="/qrScanner">สเเกนเลยสิ</router-link>
            </div>

            <div class="col-12 text-center mb-3" v-if="year_4.length == 0 && selectYear == 4">
              <p style="color:black;">ดูเหมือนว่าคุณจะยังไม่ได้ทำความรู้จักพี่ปี 4 เลยนะ</p>
              <router-link class="btn btn-dark bg-salmon w-75" tag="button" to="/qrScanner">สเเกนเลยสิ</router-link>
            </div>
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
  name: "friendListPage",
  components: {},
  data () {
    return {
      selectYear: 1,
      friendlist: "",
      year_1: [],
      year_2: [],
      year_3: [],
      year_4: [],
      loading: true
    }
  },
  methods: {
    ...mapGetters([
      'getProfile', 'checkLogined'
    ]),
    ...mapActions([
      'loginWithToken'
    ]),
    gotoProfile(uid) {
      this.$router.push(`/profile/${uid}`)
    }
  },
  mounted() {
    this.loading = true
    if (!this.checkLogined()) {
      this.loginWithToken(Cookies.get('token'))
        .then(() => {
          // this.update();
        })
        .catch((err) => {
          this.$router.push('/login')
        })
    } 
    axios({
      method: "GET",
      url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/user/friendlist",
      headers: {
        "authorization" : "Bearer " + Cookies.get('token')
      }
    })
    .then((res) => {
      // console.log(res.data)
      this.loading = false
      this.friendlist = res.data.friendList
      let year_1 = []
      let year_2 = []
      let year_3 = []
      let year_4 = []
      for (let i = 0; i < res.data.friendList.length ; i++) {
        // console.log(res.data.friendList[i].year)
        if (res.data.friendList[i].year == "1") {
          year_1.push(res.data.friendList[i])
        } else if (res.data.friendList[i].year == "2") {
          year_2.push(res.data.friendList[i])
        } else if (res.data.friendList[i].year == "3") {
          year_3.push(res.data.friendList[i])
        } else if (res.data.friendList[i].year == "4") {
          year_4.push(res.data.friendList[i])
        }
      }
      // console.log(year_1)
      // console.log(year_2)
      // console.log(year_3)
      // console.log(year_4)
      this.year_1 = year_1
      this.year_2 = year_2
      this.year_3 = year_3
      this.year_4 = year_4
      // console.log(this.year_3.length)
      
    })
    .catch((err) => {
      console.log(err)
    })
  },
};
</script>

<style lang="scss" scoped>
.bg-salmon{
    background: #FF7B7B !important;
    border: 0 !important;
    padding: .7em 1em .7em 1em !important;
}
.friendlist{
  min-height: calc(100vh - 56px);
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
