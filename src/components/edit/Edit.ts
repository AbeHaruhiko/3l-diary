/// <reference path='../../../typings/tsd.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'
import Auth from '../auth/Auth'

// require('imports?jQuery=jquery!bootstrap')

@VueComponent({
  template: require('./Edit.html')
})
export default class {

  firebaseRef: Firebase

  $route   // これがないとthis.$routeがTSコンパイルエラー。vue-router.d.tsに定義されているのでどうにかなりそうだけど・・・。

  templates: string[]
  diaryContent: string

  data(): { msg: string } {
    return {
      msg: 'Hello World!'
    }
  }

  logout(): void {
    new Auth().logout(this.$route)
  }
  // created() {
  //   this.firebaseRef = new Firebase('https://3l-diary.firebaseio.com/')
  //   this.templates = getTemplates()
  // }
  //
  // // getTemplates() {
  // //   this.firebaseRef.
  // // }
  // login() {
  //   this.firebaseRef.authWithPassword({
  //     email: this.email,
  //     password: this.password
  //   }, this.authCallback)
  // }
}
