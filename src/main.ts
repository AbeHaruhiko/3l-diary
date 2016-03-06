/// <reference path='../typings/tsd.d.ts' />

import Vue = require('vue')
import VueRouter = require('vue-router')

import App from './App'

import Hello from './components/Hello'
import Login from './components/login/Login'
import Edit from './components/edit/Edit'
import Signup from './components/signup/Signup'

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
    // '/signup': {
    //     component: Signup
    // }
    '/edit': {
        component: Edit
    },
})

// 第二引数のelementをAppでリプレイスする。
router.start(App, '#app')
