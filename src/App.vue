<template>
  <div id="app">
    <nav-card></nav-card>
    <transition name="slide-fade" mode="out-in">
      <router-view/>
    </transition>
    <!-- <footer-card></footer-card> -->
  </div>
</template>

<script>
import NavCard from '@/components/nav.vue'
import FooterCard from '@/components/footer.vue'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

export default {
  name: 'app',
  components: {
    NavCard,
    FooterCard
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Kanit|Mitr&display=swap');

@font-face {
  font-family: 'IBMPlexThai';
  src:  url('assets/fonts/IBMPlexThai-Bold.woff2') format('woff2'),
        url('assets/fonts/IBMPlexThai-ExtraLight.woff2') format('woff2'),
        url('assets/fonts/IBMPlexThai-Light.woff2') format('woff2'),
        url('assets/fonts/IBMPlexThai-Medium.woff2') format('woff2'),
        url('assets/fonts/IBMPlexThai-Regular.woff2') format('woff2'),
        url('assets/fonts/IBMPlexThai-SemiBold.woff2') format('woff2'),
        url('assets/fonts/IBMPlexThai-Text.woff2') format('woff2'),
        url('assets/fonts/IBMPlexThai-Thin.woff2') format('woff2');
}

#app {
  font-family: 'IBMPlexThai', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-image: url('assets/bg.jpg');
  background-size: cover;
  // min-height: 100vh; 
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .2s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
