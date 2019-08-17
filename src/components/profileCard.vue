<template>
  <b-container class="profile">
    <h2 class="title mb-3">PROFILE</h2>
    <b-container fluid v-if="error != null" class="mt-5 mb-5 p-5 box">
      <h2>{{ this.error.split('|')[0] }}</h2>
      <h3>{{ this.error.split('|')[1] }}</h3>
    </b-container>
    <b-container fluid v-else-if="loading" class="mt-3 mb-5 p-5 box profile-box">
      <b-row>
        <b-col class="profile-area" md="4" sm="12">
          <h2 style="word-wrap: break-word">{{ this.profile.name }}</h2>
          <b-container class="mt-3 mb-3">
            <b-img-lazy :src="`${this.profile.photoURL}?type=large`" class="profile-img mt-3 mb-3"></b-img-lazy>
  
            <h4><{{ this.profile.nickname }}></h4>
            <h5>{{ this.profile.id }} | {{ this.profile.branch }}</h5>
          </b-container>
        </b-col>
        <b-col>
          <b-container class="bio-area" sm="12">
            <h4>Bio</h4>
            <h6 style="word-wrap: break-word">{{ this.profile.bio }}</h6>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
    <b-container v-else class="mt-5 mb-5 p-5">
      <b-spinner style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
    </b-container>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cookies from 'js-cookie'
import axios from 'axios'

export default {
  name: "dashboardPage",
  components: {},
  data () {
    return {
      uid: "",
      profile: "",
      loading: false,
      error: null
    }
  },
  methods: {
    ...mapGetters([
      'getProfile'
    ]),
    ...mapActions([
      'loginWithToken', 'getProfileByUid'
    ])
  },
  mounted() {
    let token = Cookies.get('token')
    this.uid = this.$route.params.uid
    if (this.uid == null && token != null) {
      this.loginWithToken(token)
        .then((res) => {
          this.profile = res.data
          this.loading = true
        })
        .catch((err) => {
          // console.log(err)
          this.error = err
        })
    } else if (this.uid != null) {
      this.getProfileByUid(this.uid)
      .then((res) => {
        console.log(res)
        this.profile = res.user
        this.loading = true
      })
      .catch((err) => {
        console.log(err)
        this.error = err
      })
    } else {
      this.$router.push('/login')
    }
  },
};
</script>

<style lang="scss" scoped>
.profile {
  min-height: calc(100vh - 72px);
}

.profile-box {
  color: #000;
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

@media (min-width: 240px) and (max-width: 767px) {
  .profile-area {
    border-bottom: 1px #000 solid;
    padding: 1rem 0;
    margin: 1rem 0;
  }
}

@media (min-width: 768px) {
  .profile-area {
    border-right: 1px #000 solid;
  }
}

@media (min-width: 0px) and (max-width: 240px) {
  .profile-area img {
    display: none;
  }
}
</style>