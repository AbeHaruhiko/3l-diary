/// <reference path='../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'

@VueComponent({
  template: require('./Navbar.html'),
})
export default class {

  // firebaseRef: Firebase
  //
  // $route   // これがないとthis.$routeがTSコンパイルエラー。vue-router.d.tsに定義されているのでどうにかなりそうだけど・・・。
  //
  // data(): any {
  //   return {
  //   }
  // }
  //
  // created() {
  //   this.firebaseRef = new Firebase('https://3l-diary.firebaseio.com/')
  // }
}
