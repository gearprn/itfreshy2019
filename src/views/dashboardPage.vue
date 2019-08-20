<template>
  <b-container fluid class="dashboard pb-3">
    <h2 class="title-profile mb-3">PROFILE</h2>
    <transition name="fade" mode="out-in">
      <b-container v-if="loading" class="mt-3">
        <b-container class="mt-3 mb-3">
          <b-row class="textMid">
            <b-img-lazy :src="`${this.getProfile().photoURL}?type=large`" class="rounded-top"></b-img-lazy>
          </b-row>
          <b-row class="textMid">
            <div class="rounded-bottom nickname-box" style="background: #000000c9; color: #fff;">
              <h4>{{ this.getProfile().nickname }}</h4>
            </div>
          </b-row>
        </b-container>
        <b-container>
          <b-row class="infoBox rounded p-2">

            <b-col md="12" sm="12" class="">
              <h4> {{ this.getProfile().name }} </h4>
              <h6>{{ this.getProfile().branch }} | {{ this.getProfile().id }}</h6>

              <!-- <div class="p-3 bio">
                <p class="mb-0">{{ this.getProfile().bio }}</p>
              </div> -->
              <div class="friend-card">
                <p> {{ this.getProfile().bio }} </p>
              </div>
              <hr style="background: rgba(0, 0, 0, 0.363);">
              <p class="m-0">ล่ารายชื่อได้ทั้งหมด {{ this.getProfile().amountOf.sum }} คน</p>
            </b-col>

            <b-col md="12" sm="12">
              <b-row>

                <b-col md="3" sm="12" class="mt-2">
                  <div class="bio p-2 rounded">
                    <b-row>
                      <b-col md="12" sm="12">
                        <div class="rounded year">
                          <span>รุ่น 17</span>
                        </div>
                      </b-col>
                      <b-col md="12" sm="12">
                        <span>{{ this.getProfile().amountOf.year1 + " คน" }}</span>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>

                <b-col md="3" sm="12" class="mt-2">
                  <div class="bio p-2 rounded">
                    <b-row>
                      <b-col md="12" sm="12">
                        <div class="rounded year">
                          <span>รุ่น 16</span>
                        </div>
                      </b-col>
                      <b-col md="12" sm="12">
                        <span>{{ this.getProfile().amountOf.year2 + " คน" }}</span>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>

                <b-col md="3" sm="12" class="mt-2">
                  <div class="bio p-2 rounded">
                    <b-row>
                      <b-col md="12" sm="12">
                        <div class="rounded year">
                          <span>รุ่น 15</span>
                        </div>
                      </b-col>
                      <b-col md="12" sm="12">
                        <span>{{ this.getProfile().amountOf.year3 + " คน" }}</span>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>

                <b-col md="3" sm="12" class="mt-2">
                  <div class="bio p-2 rounded">
                    <b-row>
                      <b-col md="12" sm="12">
                        <div class="rounded year">
                          <span>รุ่น 14</span>
                        </div>
                      </b-col>
                      <b-col md="12" sm="12">
                        <span>{{ this.getProfile().amountOf.year4 + " คน" }}</span>
                      </b-col>
                    </b-row>
                  </div>
                </b-col>

              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
      <b-container v-else class="mt-5 mb-5">
        <b-spinner style="width: 5rem; height: 5rem;" label="Loading..."></b-spinner>
      </b-container>
    </transition>
  </b-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Cookies from 'js-cookie'
import axios from 'axios'

export default {
  name: "dashboardPage",
  components: {},
  data () {
    return {
      token: Cookies.get('token'),
      profile: this.getProfile(),
      loading: false,
      error: ""
    }
  },
  methods: {
    ...mapGetters([
      'getProfile'
    ]),
    ...mapActions([
      'loginWithToken'
    ])
  },
  mounted() {
    let profile = this.getProfile()
    // console.log(profile)
    // console.log(Object.keys(profile).length == 0)
    this.loginWithToken(this.token)
      .then((res) => {
        // console.log(res)
        profile = res.data
        this.loading = true
      })
      .catch((err) => {
        console.log(err)
        this.$router.push('/login')
      })
    this.profile = profile
  },
};
</script>

<style lang="scss">

.title {
  background-image: -webkit-gradient( linear, top, bottom, color-stop(0, #DC04FF), color-stop(1, #00114F) );
  background-image: gradient( linear, top, bottom, color-stop(0, #DC04FF), color-stop(1, #00114F) );
  background: linear-gradient(180deg, rgba(198,100,244,1) 0%, rgba(152,63,171,1) 42%, rgba(219,25,71,1) 100%);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0px 3px 1px #333300);
}
.box {
  border: 0;
  border-radius: 5px;
  box-shadow: 0px 6px 16px 0 #444;
  background: #FFF;
}
</style>

<style lang="scss" scoped>
.dashboard {
  min-height: calc(100vh - 142px);
}

.infoBox {
  background: white;
  color: black;
}

.textMid {
  display: flex;
  align-items: center;
  justify-content: center;
}

.nickname-box {
  width: 200px;
  /*height: 3em;*/
}
.overall {
  width: 80%;
  background-color: #FFF;
}

.year {
  background: hsla(0, 100%, 70%, 1);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter, .fade-leave-to
/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.title-profile {
  background-image: -webkit-gradient( linear, top, bottom, color-stop(0, #DC04FF), color-stop(1, #00114F) );
  background-image: gradient( linear, top, bottom, color-stop(0, #DC04FF), color-stop(1, #00114F) );
  background: linear-gradient(120deg, rgba(198,100,244,1) 0%, rgba(152,63,171,1) 42%, rgba(219,25,71,1) 100%);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0px 3px 1px #333300);
}

.bio {
  background: rgba(0, 0, 0, 0.1);
}


</style>
