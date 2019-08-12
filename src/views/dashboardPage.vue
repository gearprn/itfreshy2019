<template>
  <b-container class="dashboard">
    <h2>สวัสดี คุณ {{ this.uid }} </h2>
    <router-view></router-view>
  </b-container>
</template>

<script>
export default {
  name: "dashboardPage",
  components: {},
  data: {
    uid: localStorage.getItem('token')
  },
  methods: {}
};
</script>

<style lang="scss">
</style>