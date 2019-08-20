<template>
  <footer style="margin-top: 30px">
    <div class="footer-copyright text-right pr-3 py-1 bg-dark">
      made with BootstrapVue and
      <img src="../assets/itec_logo2.png" style="height:48px;" alt="">
    </div>
  </footer>
</template>

<script>
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";

Vue.use(BootstrapVue);
export default {
  name: "FooterCard"
};
</script>

<style lang="scss" scoped>
footer > *:last-child {
  margin-bottom: 0px;
}
.bg-dark {
  color: rgba(255, 255, 255, 0.5);
  background-color: #343a40 !important;
}
</style>

