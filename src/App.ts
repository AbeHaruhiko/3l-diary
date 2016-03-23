/// <reference path='../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'
import store from './vuex/store'

@VueComponent({
  store,
  template: '<router-view></router-view>'
})
export default class {
  // $store
}
