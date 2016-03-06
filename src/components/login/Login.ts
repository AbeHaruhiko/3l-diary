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

  firebaseRef: Firebase;

  authService: Auth;

  email: string;
  password: string;

  $route;   // これがないとthis.$routeがTSコンパイルエラー。vue-router.d.tsに定義されているのでどうにかなりそうだけど・・・。

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
    // this.firebaseRef.authWithPassword({
    //   email: this.email,
    //   password: this.password
    // }, this.authCallback)
    this.authService.login(this.email, this.password, this.$route)
  }

  loginWithProvider(provider: string) {
    // this.firebaseRef.authWithOAuthPopup(provider, this.authCallback)
    this.authService.loginWithProvider(provider)
  }

  // authCallback(error: string, authData) {
  //   if (error) {
  //     console.log('Login Failed!', error)
  //   } else {
  //     console.log('Authenticated successfully with payload:', authData)
  //     this.$route.router.go('/edit')
  //   }
  // }
}
