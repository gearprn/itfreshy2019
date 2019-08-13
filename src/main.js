import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import firebase from 'firebase'
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyC64aXJn92L6u8TxPA6CDB7Jw7CO_ehx-0",
  authDomain: "itfreshy2019.firebaseapp.com",
  databaseURL: "https://itfreshy2019.firebaseio.com",
  projectId: "itfreshy2019",
  storageBucket: "itfreshy2019.appspot.com",
  messagingSenderId: "177784213111",
  appId: "1:177784213111:web:798540e5dfd6e335"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
