<template>
  <b-container class="dashboard">
    <h2>สวัสดี คุณ {{ this.uid }}</h2>
    <router-view></router-view>
  </b-container>
</template>

<script>
import { getters, mapGetters } from 'vuex'

export default {
  name: "dashboardPage",
  components: {},
  data () {
    return {
      uid: localStorage.getItem('token')
    }
  },
  methods: {
    ...mapGetters([
      'getUser'
    ]),
  },
  onload() {
    console.log(this.getUser)
  }
};
</script>

<style lang="scss">
</style>