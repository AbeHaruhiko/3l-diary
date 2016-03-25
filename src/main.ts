/// <reference path='../typings/browser.d.ts' />

import Vue = require('vue')
import VueRouter = require('vue-router')

import App from './App'
import store from './vuex/store'
var { syncStoreRouter } = require('vuex-router-sync')
import { configRouter } from './router-config'

require('bootstrap')

require('../node_modules/bootstrap/dist/css/bootstrap.css')
require('../node_modules/font-awesome/css/font-awesome.min.css')

Vue.config.debug = true

Vue.use(VueRouter)

// router インスタンスを作成。
var router = new VueRouter({
  history: false
})

// configure router
configRouter(router, store)

// routerとstoreを同期
syncStoreRouter(store, router)

// 第二引数のelementをAppでリプレイスする。
router.start(App, '#app')
