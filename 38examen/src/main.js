import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAXRsKFCg-KrsoDMVqevXKoR52Pm1R6HEQ",
  authDomain: "examen-53f52.firebaseapp.com",
  databaseURL: "https://examen-53f52.firebaseio.com",
  projectId: "examen-53f52",
  storageBucket: "examen-53f52.appspot.com",
  messagingSenderId: "823204721791",
  appId: "1:823204721791:web:7bbbe517a2a4797f4cbb4a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export let globAcceso = {valor: false};


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
