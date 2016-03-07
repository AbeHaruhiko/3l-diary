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

    this.firebaseRef.onAuth((authData) => {
      if (!authData) {
        return
      }
      this.firebaseRef.child('users').child(authData.uid).on('value', (snapshot) => {
        if (!snapshot.exists()) {
          // save the user's profile into the database so we can list users,
          // use them in Security and Firebase Rules, and show profiles
          this.firebaseRef.child('users').child(authData.uid).set({
            provider: authData.provider,
            name: this.getName(authData)
          })
        }
      })
    })

  }

  signup(email: string, password: string, route) {
    this.firebaseRef.createUser({
      email: email,
      password: password
    }).then((userData: FirebaseUserData) => {
      console.log('Successfully created user account with uid:', userData.uid);
      this.login(email, password, route)
    }, (error) => {
      switch (error.code) {
        case 'EMAIL_TAKEN':
          console.log('The new user account cannot be created because the email is already in use.');
          break;
        case 'INVALID_EMAIL':
          console.log('The specified email is not a valid email.');
          break;
        default:
          console.log('Error creating user:', error);
      }
    })
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

  logout(route): void {
    this.firebaseRef.unauth()
    route.router.go('/login')
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

  // find a suitable name based on the meta info given by each provider
  getName(authData: FirebaseAuthData): string {
    switch (authData.provider) {
       case 'password':
         return authData.password.email.replace(/@.*/, '');
       case 'twitter':
         return authData.twitter.displayName;
       case 'facebook':
         return authData.facebook.displayName;
    }
  }
}
