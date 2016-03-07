/// <reference path='../../../typings/tsd.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'
import Firebase = require('firebase')
import Auth from '../auth/Auth'

require('./Login.css')

@VueComponent({
  template: require('./Login.html')
})
export default class {

  firebaseRef: Firebase

  authService: Auth

  email: string
  password: string

  $route   // これがないとthis.$routeがTSコンパイルエラー。vue-router.d.tsに定義されているのでどうにかなりそうだけど・・・。

  data(): any {
    return {
      email: this.email,
      password: this.password
    }
  }

  created() {
    this.firebaseRef = new Firebase('https://3l-diary.firebaseio.com/')
    this.authService = new Auth()
  }

  login() {
    this.authService.login(this.email, this.password, this.$route)
  }

  loginWithProvider(provider: string) {
    this.authService.loginWithProvider(provider)
  }
}
