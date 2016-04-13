/// <reference path='../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'
import store from './vuex/store'

export const API_ENDPOINT: string = 'http://localhost:8080/api'
export const LOGIN_ENDPOINT: string = 'http://localhost:8080/login'
export const URL_PATH_POSTS: string = '/posts'
export const URL_PATH_TEMPLATES: string = '/templates'
export const PAGE_SIZE: number = 10


@VueComponent({
  store,
  template: '<router-view></router-view>'
})
export default class App {
  // $store
}
