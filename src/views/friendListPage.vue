<template>
  <b-container fluid class="friendlist">
    <h2 class="mb-3">
      <span class="title">Friend List</span>
    </h2>
    <b-container class="box">
      <b-row>
        <b-tabs v-model="showYear" align="center" class="nav-tab" fill>
          <b-tab active title="ปี 1">
            <b-row class="my-5 justify-content-center" v-if="!loading">
              <b-spinner variant="dark" style="width: 5rem; height: 5rem;"></b-spinner>
            </b-row>
            <b-row v-else>
              <b-col style="color: black;" class="my-5" v-if="friendlist.year1.length == 0">
                <h3>ดูเหมือนว่าคุณยังไม่ได้ทำความรู้จักกับเพื่อนปี 1 เลยนะ</h3>  
              </b-col>
              <b-col v-else>
                <b-row class="filter-tab py-3 px-5 text-left align-items-center">
                  <b-col md="3" sm="6">
                    ค้นหาจากชื่อเล่น 
                  </b-col>
                  <b-col sm="6">
                    <b-form-input v-model="search_name" placeholder="ชื่อเล่นที่ต้องการค้นหา"></b-form-input> 
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4" sm="12" class="my-2" v-for="friend in filterName">
                    <div class="card m-3 friend-card" @click="gotoProfile(friend.uid)">
                      <div class="friend-image pt-2 pb-1 px-1">
                        <b-img-lazy :src="friend.photoURL + '?type=large'"></b-img-lazy>
                      </div>
                      <h5>{{friend.name}}</h5>
                      <h6><{{friend.nickname}}></h6>
                      <!-- <span style="word-wrap: break-word;">{{friend.bio}}</span> -->
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="ปี 2">
            <b-row class="my-5 justify-content-center" v-if="!loading">
              <b-spinner variant="dark" style="width: 5rem; height: 5rem;"></b-spinner>
            </b-row>
            <b-row v-else>
              <b-col style="color: black;" class="my-5" v-if="friendlist.year2.length == 0">
                <h3>ดูเหมือนว่าคุณยังไม่ได้ทำความรู้จักกับพี่ปี 2 เลยนะ</h3>  
              </b-col>
              <b-col v-else>
                <b-row class="filter-tab py-3 px-5 text-left align-items-center">
                  <b-col md="3" sm="6">
                    ค้นหาจากชื่อเล่น 
                  </b-col>
                  <b-col sm="6">
                    <b-form-input v-model="search_name" placeholder="ชื่อเล่นที่ต้องการค้นหา"></b-form-input> 
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4" sm="12" class="my-2" v-for="friend in filterName">
                    <div class="card m-3 friend-card" @click="gotoProfile(friend.uid)">
                      <div class="friend-image pt-2 pb-1 px-1">
                        <b-img-lazy :src="friend.photoURL + '?type=large'"></b-img-lazy>
                      </div>
                      <h5>{{friend.name}}</h5>
                      <h6><{{friend.nickname}}></h6>
                      <!-- <span style="word-wrap: break-word;">{{friend.bio}}</span> -->
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="ปี 3">
            <b-row class="my-5 justify-content-center" v-if="!loading">
              <b-spinner variant="dark" style="width: 5rem; height: 5rem;"></b-spinner>
            </b-row>
            <b-row v-else>
              <b-col style="color: black;" class="my-5" v-if="friendlist.year3.length == 0">
                <h3>ดูเหมือนว่าคุณยังไม่ได้ทำความรู้จักกับพี่ปี 3 เลยนะ</h3>  
              </b-col>
              <b-col v-else>
                <b-row class="filter-tab py-3 px-5 text-left align-items-center">
                  <b-col md="3" sm="6">
                    ค้นหาจากชื่อเล่น 
                  </b-col>
                  <b-col sm="6">
                    <b-form-input v-model="search_name" placeholder="ชื่อเล่นที่ต้องการค้นหา"></b-form-input> 
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4" sm="12" class="my-2" v-for="friend in filterName">
                    <div class="card m-3 friend-card" @click="gotoProfile(friend.uid)">
                      <div class="friend-image pt-2 pb-1 px-1">
                        <b-img-lazy :src="friend.photoURL + '?type=large'"></b-img-lazy>
                      </div>
                      <h5>{{friend.name}}</h5>
                      <h6><{{friend.nickname}}></h6>
                      <!-- <span style="word-wrap: break-word;">{{friend.bio}}</span> -->
                    </div>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="ปี 4">
            <b-row class="my-5 justify-content-center" v-if="!loading">
              <b-spinner variant="dark" style="width: 5rem; height: 5rem;"></b-spinner>
            </b-row>
            <b-row v-else>
              <b-col style="color: black;" class="my-5" v-if="friendlist.year4.length == 0">
                <h3>ดูเหมือนว่าคุณยังไม่ได้ทำความรู้จักกับพี่ปี 4 เลยนะ</h3>  
              </b-col>
              <b-col v-else>
                <b-row class="filter-tab py-3 px-5 text-left align-items-center">
                  <b-col md="3" sm="6">
                    ค้นหาจากชื่อเล่น 
                  </b-col>
                  <b-col sm="6">
                    <b-form-input v-model="search_name" placeholder="ชื่อเล่นที่ต้องการค้นหา"></b-form-input> 
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md="4" sm="12" class="my-2" v-for="friend in filterName">
                    <div class="card m-3 friend-card" @click="gotoProfile(friend.uid)">
                      <div class="friend-image pt-2 pb-1 px-1">
                        <b-img-lazy :src="friend.photoURL + '?type=large'"></b-img-lazy>
                      </div>
                      <h5>{{friend.name}}</h5>
                      <h6><{{friend.nickname}}></h6>
                      <!-- <span style="word-wrap: break-word;">{{friend.bio}}</span> -->
                    </div>
                  </b-col>
                </b-row>
              </b-col>
              </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
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
      showYear: 3,
      friendlist: {
        year1: [],
        year2: [],
        year3: [],
        year4: []
      },
      loading: false,
      search_name: ""
    }
  },
  methods: {
    gotoProfile(uid) {
      this.$router.push(`/profile/${uid}`)
    }
  },
  computed: {
    filterName() {
      let arr = this.friendlist["year" + (this.showYear + 1)]
      return arr.filter(item => {
        return item.nickname.includes(this.search_name)
      })
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
      // console.log(res.data)
      res.data.friendList.forEach((value) => {
        if (value.year == 1) {
          this.friendlist.year1.push(value)
        } else if (value.year == 2) {
          this.friendlist.year2.push(value)
        } else if (value.year == 3) {
          this.friendlist.year3.push(value)
        } else if (value.year == 4) {
          this.friendlist.year4.push(value)
        }
      })
      this.loading = true
      let c_year = "year" + (this.showYear + 1)
      console.log(this.friendlist[c_year])
      // this.friendlist = res.data.friendList
    })
    .catch((err) => {
      // console.log(err)
    })
  }
};
</script>

<style lang="scss" scoped>
.friendlist {
  min-height: calc(100vh - 102px);
}

.title {
  background-image: linear-gradient(120deg, #f093fb 0%, #f5576c 100%);
}

.overall {
  width: 80%;
  background-color: #FFF;
}

.friend-card {
  color: #000;
  // background: rgb(253,253,253);
  // background: linear-gradient(180deg, rgba(253,253,253,1) 0%, rgba(250,250,250,1) 30%, rgba(235,235,235,1) 100%);
  border: 0;
  border-radius: 4px;
  box-shadow: 1px 1px 3px 1px #AFAFAF;
  cursor: pointer;
  .friend-image > img {
    width: 100%;
    max-width: 180px;
  }
}

.friend-card:hover, .friend-card:active {
  background: rgb(250,250,250);
  box-shadow: 1px 1px 4px 0 #AFAFAF;
}

.filter-tab {
  color: black;
}

.nav-tab {
  width: 100%;
}
</style>
