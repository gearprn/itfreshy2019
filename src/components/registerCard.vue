<template>
  <b-container fluid class="mt-3">
    <b-container>
      <b-form v-on:submit.prevent="onSubmit">
        <div class="form-group text-left">
          <h2>โปรดใส่ข้อมูลของคุณ</h2>
          <hr>
          <div class="row">
            <div class="col-md-4 col-sm-12">
              <label class="control-label">ชื่อ-นามสกุล <span class="req-field">*</span></label>
              <input type="name" class="form-control" placeholder="ตัวอย่าง นายประยุทธ์ จันทร์อังคาร" v-model="name" required>
            </div>

            <div class="col-md-4 col-sm-12">
              <label class="control-label">ชื่อเล่น <span class="req-field">*</span></label>
              <input type="name" class="form-control" placeholder="ตัวอย่าง ตู่ พบกัน" v-model="nickname" required>
            </div>

            <div class="col-md-4 col-sm-12">
              <label class="control-label">รหัสนักศึกษา <span class="req-field">*</span></label>
              <input type="name" class="form-control" placeholder="ตัวอย่าง 62070044" v-model="sid" required>
            </div>
            
            <div class="col-md-4 col-sm-12">
              <label class="control-label">ชั้นปี <span class="req-field">*</span></label>
              <select v-model="year" class="custom-select">
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
              <textarea type="text" class="form-control" rows="5" placeholder="คอลลาเจนคืออาหารเสริม เเต่ถ้ามึงอยากเเดกเพิ่มเติมเเนะนำตีน" v-model="bio" required></textarea>
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
    onSubmit() {
      // console.log(localStorage.getItem('token'));
      // console.log(localStorage.getItem('email'));
      // console.log(localStorage.getItem('photoURL'));
      axios({
        method: "POST",
          url: "https://us-central1-itfreshy2019.cloudfunctions.net/api/user/register",
          headers: {
            "authorization" : "Bearer " + localStorage.getItem('token')
          },
          data: {
            "name": this.name,
            "nickname": this.nickname,
            "id": this.sid,
            "year": this.year,
            "branch": this.branch,
            "bio": this.bio,
            "email": localStorage.getItem('email'),
            "imgUrl": localStorage.getItem('photoURL')
          }
      })
      .then((res) => {
        if (res.data.status) {
          this.$router.push('/dashboard')
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
};
</script>

<style>
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
