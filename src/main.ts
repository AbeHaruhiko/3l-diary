// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { sync } from 'vuex-router-sync'

import router from './router'
import store from './store'
// import { firebaseConfig }　from './conf/firebase'
import { firebaseApp, firebaseUiApp } from './conf/firebase';

import { configRouter } from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

import 'firebaseui/dist/firebaseui.css'
 
Vue.config.productionTip = false

configRouter(router)
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      store.commit('setCurrentUser', user)      
      if(user) {
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect)
        } else {
          this.$router.push('/')
        }
      } else {
        this.$router.push('/auth')
      }
    })
    store.commit('setFirebaseApp', firebaseApp);
    store.commit('setFirebaseUiApp', firebaseUiApp);
  }
})
