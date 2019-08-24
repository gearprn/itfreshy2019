<template>
  <b-container class="edit-profile">
    <h2 class="mb-3">
      <span class="title">EDIT PROFILE</span>
    </h2>
    <b-container fluid v-if="error != null" class="mt-5 mb-5 p-5 box errorBox">
      <h2>{{ this.error }}</h2>
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
            <b-form-textarea v-model="bio" placeholder="Your bio here" rows="6" max-rows="8" no-auto-shrink :value="bio"></b-form-textarea>
          </b-container>
          <b-button type="submit" variant="primary" class="mt-3" @click="updateProfile">แก้ไขข้อมูล</b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-container v-else class="mt-5 mb-5 p-5">
      <b-spinner style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
    </b-container>
    <b-modal v-model="showLog" size="lg" centered hide-body hide-footer no-stacking title="แจ้งเตือน">
      <div class="d-block text-center p-3 ">
        <h4> {{ log }} </h4>
      </div>
    </b-modal>
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Cookies from 'js-cookie'
import axios from 'axios'

export default {
  name: "editProfile",
  components: {},
  data () {
    return {
      uid: "",
      profile: "",
      bio: "",
      loading: false,
      error: null,
      log: "",
      showLog: false
    }
  },
  methods: {
    ...mapGetters([
      'getProfile'
    ]),
    ...mapActions([
      'loginWithToken', 'getProfileByUid'
    ]),
    updateProfile() {
      console.log(this.bio)
      axios({
        method: "PUT",
        url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/user/edit",
        headers: {
          "authorization" : "Bearer " + Cookies.get('token')
        },
        data: {
          bio: this.bio
        }
      })
      .then(res => {
        console.log(res)
        if (res.data.statusCode == 200) {
          this.showModal("ได้ทำการบันทึกข้อมูลเรียบร้อยแล้ว")
        } else {
          this.showModal("มีบางสิ่งผิดพลาด กรุณาลองใหม่ในภายหลัง")
        }
      })
      .catch(err => {
        console.log(err)
        this.showModal("มีบางสิ่งผิดพลาด กรุณาลองใหม่ในภายหลัง")
      })
    },
    showModal(log) {
      this.log = log
      this.showLog = true
    },
    hideModal() {
      this.log = log
      this.showLog = false
    }
  },
  mounted() {
    let token = Cookies.get('token')
    this.uid = this.$route.params.uid
    if (this.uid == null && token != null) {
      this.loginWithToken(token)
        .then((res) => {
          this.profile = res.data
          this.bio = this.profile.bio
          this.loading = true
        })
        .catch((err) => {
          this.error = err
        })
    } else if (this.uid != null) {
      this.getProfileByUid(this.uid)
      .then((res) => {
        this.profile = res.user
        this.bio = this.profile.bio
        this.loading = true
      })
      .catch((err) => {
        this.error = err
      })
    } else {
      this.$router.push('/login')
    }
  },
};
</script>

<style lang="scss">
.modal {
  font-family: 'IBMPlexThai', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.modal-backdrop {
  background: rgba(0, 0, 0, 0.3)
}
</style>

<style lang="scss" scoped>
.title {
  background: #00b09b;  /* fallback for old browsers */
  background-image: -webkit-linear-gradient(to right, #96c93d, #00b09b);  /* Chrome 10-25, Safari 5.1-6 */
  background-image: linear-gradient(to right, #96c93d, #00b09b); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0px 3px 1px #333300);
}

.edit-profile {
  min-height: calc(100vh - 160px);
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

.errorBox {
  color: #B33A3A;
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