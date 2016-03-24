/// <reference path='../typings/browser.d.ts' />

import Vue = require('vue')
import VueRouter = require('vue-router')

import App from './App'
import store from './vuex/store'
var { sync } = require('vuex-router-sync')
import Auth from './components/auth/Auth'

import Hello from './components/Hello'
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import Edit from './components/edit/Edit'
import Post from './components/post/Post'
import PostList from './components/post-list/PostList'

require('bootstrap')

require('../node_modules/bootstrap/dist/css/bootstrap.css')
require('../node_modules/font-awesome/css/font-awesome.min.css')

Vue.config.debug = true

Vue.use(VueRouter)

// router インスタンスを作成。
var router = new VueRouter({
  history: false
})

// routes を定義します
router.map({
  '/hello': {
    component: Hello
  },
  '/login': {
      component: Login
  },
  '/signup': {
      component: Signup
  },
  '/post/:post_id': {
      name: 'post',
      component: Post
  },
  '/posts': {
      component: PostList,
      needsAuth: true
  },
  '/edit': {
      component: Edit
  },
})

// router.redirect({
//     '/': '/posts'
// })

// 認証
router.beforeEach(function (transition: vuerouter.Transition<any, any, any, any, any>) {

  console.log(transition)
  // 認証済みで行き先がloginだったらpostsへ。
  if (store.state.authData && transition.to.path === '/login') {
    transition.redirect('/posts')
    return true
  }
  
  
  if (transition.to["needsAuth"]) {
      // 認証処理
      console.log('auth： ' + store.state.authData.token)
      if (store.state.authData) {
        transition.next()
      } else {
        transition.redirect('/login')
      }
      return true
  }
  // qiita これがないとnext()やredirect()で遷移しない（URLだけ書き換わる）
  return true
})

// routerとstoreを同期
sync(store, router)

// 第二引数のelementをAppでリプレイスする。
router.start(App, '#app')
