/// <reference path='../../typings/tsd.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'

import Firebase = require('firebase')

@VueComponent({
  template: require('./Login.html')
})
export default class {

  firebaseRef: Firebase;

  email: string;
  password: string;

  data(): any {
    return {
      email: this.email,
      password: this.password
    }
  }

  created() {
    this.firebaseRef = new Firebase('https://3l-diary.firebaseio.com/');
  }

  login() {
    this.firebaseRef.authWithPassword({
      email: this.email,
      password: this.password
    }, this.authCallback);
  }

  authCallback(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  }
}
