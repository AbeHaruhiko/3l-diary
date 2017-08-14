/// <reference path='../../../typings/browser.d.ts' />

'use strict'

import { LOGIN_ENDPOINT, URL_PATH_POSTS } from '../../App'
import store from '../../vuex/store'
import { clearAuthData, setAuthData } from '../../vuex/actions'
var request = require('superagent')

export default class Auth {

  // firebaseRef: Firebase
  
  authData: { username: string, token: string } = { username: '', token: '' }
  
  private static _instance: Auth = null;
  constructor() {
    if (Auth._instance) {
      throw new Error("must use the getInstance.");
    }
    Auth._instance = this;
  }
  public static getInstance(): Auth {
    if (Auth._instance === null) {
      Auth._instance = new Auth();
    }
    return Auth._instance;
  }
  
  // data() {
  //     return {
  //         API_ENDPOINT: "http://localhost:8080/api",
  //         LOGIN_ENDPOINT: "http://localhost:8080/login",
  //         authData: {}
  //     }
  // }

  // created() {
  //   this.firebaseRef = new Firebase('https://3l-diary.firebaseio.com/')

  //   this.firebaseRef.onAuth((authData) => {
  //     if (!authData) {
  //       return
  //     }
  //     this.firebaseRef.child('users').child(authData.uid).on('value', (snapshot) => {
  //       if (!snapshot.exists()) {
  //         // save the user's profile into the database so we can list users,
  //         // use them in Security and Firebase Rules, and show profiles
  //         this.firebaseRef.child('users').child(authData.uid).set({
  //           provider: authData.provider,
  //           name: this.getName(authData)
  //         })
  //       }
  //     })
  //   })

  // }

  signup(email: string, password: string, route) {
    // this.firebaseRef.createUser({
    //   email: email,
    //   password: password
    // }).then((userData: FirebaseUserData) => {
    //   console.log('Successfully created user account with uid:', userData.uid);
    //   this.login(email, password, route)
    // }, (error) => {
    //   switch (error.code) {
    //     case 'EMAIL_TAKEN':
    //       console.log('The new user account cannot be created because the email is already in use.');
    //       break;
    //     case 'INVALID_EMAIL':
    //       console.log('The specified email is not a valid email.');
    //       break;
    //     default:
    //       console.log('Error creating user:', error);
    //   }
    // })
  }

  login(email: string, password: string, route) {
    
    if (store.state.authData && store.state.authData.token) {
      // 認証済みのため一覧へ
      route.router.go(URL_PATH_POSTS)
    } else {
      request
        .post(LOGIN_ENDPOINT)
        .type('form')
        .send({ username: email })
        .send({ password: password })
        .end((err, res) => {
          if (err) {
            throw err
          }
          // mutation外での変更は禁止。
          // store.state.authData.username = email
          // store.state.authData.token = res.header['x-auth-token']
          setAuthData(store, email, res.header['x-auth-token'])
          console.log('Authenticated successfully with payload:', store.state.authData)
          route.router.go(URL_PATH_POSTS)
        });
    }
  }

  loginWithProvider(provider: string) {
    // this.firebaseRef.authWithOAuthPopup(provider, this.getAuthCallback)
  }

  logout(route): void {
    clearAuthData(store)
    route.router.push('/login')
  }

  // getAuthCallback(route): (error: any, authData: FirebaseAuthData) => void {
  //   return function authCallback(error: string, authData: FirebaseAuthData): void {
  //     if (error) {
  //       console.log('Signup Failed!', error)
  //     } else {
  //       console.log('Authenticated successfully with payload:', authData)
  //       route.router.go(URL_PATH_POSTS)
  //     }
  //   }
  // }

  // // find a suitable name based on the meta info given by each provider
  // getName(authData: FirebaseAuthData): string {
  //   switch (authData.provider) {
  //      case 'password':
  //        return authData.password.email.replace(/@.*/, '');
  //      case 'twitter':
  //        return authData.twitter.displayName;
  //      case 'facebook':
  //        return authData.facebook.displayName;
  //   }
  // }
}