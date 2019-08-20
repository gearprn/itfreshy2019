<template>
  <b-container fluid class="mt-3 register">
    <b-container>
      <b-form v-on:submit.prevent="onSubmit">
        <div class="form-group text-left">
          <h2>โปรดใส่ข้อมูลของคุณ</h2>
          <hr>
          <div class="row">
            <div class="col-md-4 col-sm-12">
              <label class="control-label">ชื่อ-นามสกุล <span class="req-field">*</span></label>
              <input type="name" class="form-control" placeholder="ชื่อภาษาไทย" v-model="name" required>
            </div>

            <div class="col-md-4 col-sm-12">
              <label class="control-label">ชื่อเล่น <span class="req-field">*</span></label>
              <input type="name" class="form-control" placeholder="ไอทีไอที" v-model="nickname" required>
            </div>

            <div class="col-md-4 col-sm-12">
              <label class="control-label">รหัสนักศึกษา <span class="req-field">*</span></label>
              <input type="name" class="form-control" placeholder="62070001" v-model="sid" id="sid" required>
            </div>
            
            <div class="col-md-4 col-sm-12">
              <label class="control-label">ชั้นปี <span class="req-field">*</span></label>
              <select v-model="year" class="custom-select" id="year">
                <option value="1">ชั้นปีที่ 1</option>
                <option value="2">ชั้นปีที่ 2</option>
                <option value="3">ชั้นปีที่ 3</option>
                <option value="4">ชั้นปีที่ 4</option>
              </select>
            </div>

            <div class="col-md-4 col-sm-12">
              <label class="control-label">สาขา <span class="req-field">*</span></label>
              <select v-model="branch" class="custom-select">
                <option value="IT">IT</option>
                <option value="DSBA">DSBA</option>
                <option value="BIT">BIT</option>
              </select>
            </div>

            <div class="col-lg-12 col-sm-12">
              <label class="control-label">อธิบายตัวคุณเเบบง่ายๆ <span class="req-field">*</span></label>
              <textarea type="text" class="form-control" rows="5" placeholder="ใส่คำอธิบายที่เป็นตัวคุณ" v-model="bio" required></textarea>
            </div>

          </div>

        </div>
        <button type="submit" class="btn btn-primary">ลงทะเบียนเลยจ้า</button>
      </b-form>
    </b-container>
  </b-container>
</template>

<script>
import BootstrapVue from "bootstrap-vue";
import firebase from "firebase";
import axios from "axios";
import Cookies from "js-cookie"
import { mapMutations, mapActions } from 'vuex';

export default {
  name: "registerCard",
  data() {
    return {
      isActive: false,
      name: "",
      nickname: "",
      sid: "",
      year: "1",
      branch: "IT",
      bio: ""
    };
  },
  methods: {
    ...mapMutations([
      'setProfile',
    ]),
    ...mapActions([
      'loginWithToken'
    ]),
    onSubmit() {
      let token = Cookies.get('token')
      console.log(this.sid)
      if ((this.sid.startsWith("62") && this.year == 1) ||
          (this.sid.startsWith("61") && this.year == 2) ||
          (this.sid.startsWith("60") && this.year == 3) ||
          (this.sid.startsWith("59") && this.year == 4)) {
        axios({
          method: "POST",
            url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/user/register",
            headers: {
              "authorization" : "Bearer " + token
            },
            data: {
              "name": this.name,
              "nickname": this.nickname,
              "id": this.sid,
              "year": this.year,
              "branch": this.branch,
              "bio": this.bio,
              "email": this.$store.getters.getEmail,
              "imgUrl": this.$store.getters.getPhotoURL
            }
        })
        .then((res) => {
          // console.log(token)
          if (res.data.status) {
            axios({
              method: "GET",
              url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/user/myprofile",
              headers: {
                "authorization" : "Bearer " + token
              }
            })
            .then((res) => {
              // console.log(res)
              this.setProfile(res.data)
              this.$router.push('/dashboard')
            })
          }
          this.$router.push('/login')
        })
        .catch((err) => {
          console.log(err)
        })
      } else {
        let error = "รหัสนักศึกษากับชั้นปีไม่สอดคล้องกัน"
        console.log(error)
        document.querySelector("#sid").style.borderWidth = "2px";
        document.querySelector("#sid").style.borderColor = "red";
        document.querySelector("#year").style.borderWidth = "2px";
        document.querySelector("#year").style.borderColor = "red";
      }
    } 
  }
};
</script>

<style>
.register {
  min-height: calc(100vh - 144px);
}

.form-control {
  margin-bottom: 1em;
}

select.custom-select {
  display: block;
  width: 100%;
  height: calc(1.5em + .75rem + 2px);
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  margin-bottom: 1em;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;
}

/* .form-group {
  margin-top: 1em;
  margin-bottom: 1em;
  border-left: #ee4b23 solid 3px;
  padding-left: 1em;
} */

form {
  margin-bottom: 1em;
}
</style>
