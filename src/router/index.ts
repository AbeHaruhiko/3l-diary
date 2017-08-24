import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

import Main from '@/components/Main.vue'
import Hello from '@/components/Hello.vue'
import Auth from '@/components/Auth.vue'
import Post from '@/components/Post.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Main, meta: { requiresAuth: true } },
    { path: '/auth', component: Auth },
    { path: '/hello', component: Hello, meta: { requiresAuth: true } },
    { path: '/posts/:id', component: Post, name: 'post' }
  ]
})

export function configRouter (router) {
  // 認証
  router.beforeEach((to: VueRouter.Route, from: VueRouter.Route, next: Function) => {

    const currentUser = firebase.auth().currentUser

    if (to.matched.some(record => record.meta.requiresAuth)) {
      // このルートはログインされているかどうか認証が必要です。
      // もしされていないならば、ログインページにリダイレクトします。
      if (currentUser) {
        next()
      } else {
        // next({ path: '/auth' })
        next({ path: '/auth', query: { redirect: to.fullPath }})
        // TODO: to.fullPathへのリダイレクト
      }
    } else {
      next()
    }
  })

}