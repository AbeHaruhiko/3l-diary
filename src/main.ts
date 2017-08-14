/// <reference path='../typings/browser.d.ts' />

import Vue = require('vue')
import VueRouter = require('vue-router')

import App from './App'
import store from './vuex/store'
var { sync } = require('vuex-router-sync')
import { configRouter } from './router-config'
import { routes } from './router-config'
import { configAxios } from './axios-config'

require('bootstrap')

require('../node_modules/bootstrap/dist/css/bootstrap.css')
require('../node_modules/font-awesome/css/font-awesome.min.css')

Vue.use(VueRouter)

// router インスタンスを作成。
var router = new VueRouter({
  history: false,
  routes: routes
})

// configure router
configRouter(router, store)

// routerとstoreを同期
sync(store, router)

// configure axios
configAxios(router, store)

// 第二引数のelementをAppでリプレイスする。
new Vue({
  el: '#app',
  router: router
})