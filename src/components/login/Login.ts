/// <reference path='../../../typings/tsd.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'

import Firebase = require('firebase')

require('./Login.css')

@VueComponent({
  template: require('./Login.html')
})
export default class {

  firebaseRef: Firebase;

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
  }

  login() {
    this.firebaseRef.authWithPassword({
      email: this.email,
      password: this.password
    }, this.authCallback)
  }

  loginWithProvider(provider: string) {
    this.firebaseRef.authWithOAuthPopup(provider, this.authCallback)
  }

  authCallback(error: string, authData) {
    if (error) {
      console.log('Login Failed!', error)
    } else {
      console.log('Authenticated successfully with payload:', authData)
      this.$route.router.go('/edit')
    }
  }
}
