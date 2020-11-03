import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import firebase from 'firebase/app';
import 'firebase/firestore';
import VueTextareaAutosize from 'vue-textarea-autosize';

Vue.use(VueTextareaAutosize);

const firebaseConfig = {
  apiKey: "AIzaSyCsK9gvBeXfQvPU-1vfMjydXQtfHQDt_Uc",
  authDomain: "calendario-e8d7d.firebaseapp.com",
  databaseURL: "https://calendario-e8d7d.firebaseio.com",
  projectId: "calendario-e8d7d",
  storageBucket: "calendario-e8d7d.appspot.com",
  messagingSenderId: "479338855695",
  appId: "1:479338855695:web:768722c01bdb66bd4f527a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
