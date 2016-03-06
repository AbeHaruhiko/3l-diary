/// <reference path='../../../typings/tsd.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'
import Firebase = require('firebase')

@VueComponent({
})
export default class {

  firebaseRef: Firebase

  created() {
    this.firebaseRef = new Firebase('https://3l-diary.firebaseio.com/')
  }

  signup(email: string, password: string, route) {
    this.firebaseRef.createUser({
      email: email,
      password: password
    }, this.getAuthCallback(route))
  }

  login(email: string, password: string, route) {
    this.firebaseRef.authWithPassword({
      email: email,
      password: password
    }, this.getAuthCallback(route))
  }

  loginWithProvider(provider: string) {
    this.firebaseRef.authWithOAuthPopup(provider, this.getAuthCallback)
  }

  getAuthCallback(route): (error: any, authData: FirebaseAuthData) => void {
    return function authCallback(error: string, authData: FirebaseAuthData): void {
      if (error) {
        console.log('Signup Failed!', error)
      } else {
        console.log('Authenticated successfully with payload:', authData)
        route.router.go('/edit')
      }
    }
  }
}
