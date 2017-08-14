import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

import Main from '@/components/Main.vue'
import Auth from '@/components/Auth.vue'
import AuthSuccess from '@/components/AuthSuccess.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Main, meta: { needsAuth: true } },
    { path: '/auth', component: Auth },
    { path: '/success', component: AuthSuccess }
  ]
})

export function configRouter (router) {
  // 認証
  router.beforeEach((to: VueRouter.Route, from: VueRouter.Route, next: Function) => {

    const currentUser = firebase.auth().currentUser

    if (currentUser && to.path === '/login') {
      router.redirect('/Main')
      next()
    }

    if (to["meta"]["needsAuth"]) {
        // 認証処理
        router.redirect('/auth')
        next()
    }
  })

}