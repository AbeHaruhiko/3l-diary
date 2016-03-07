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

  created() {
    this.firebaseRef = new Firebase('https://3l-diary.firebaseio.com/')
  }

  save() {
    const authData: FirebaseAuthData = this.firebaseRef.getAuth()
    this.firebaseRef.child('posts').child(authData.uid).push({
      content: this.diaryContent,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    })
  }
}
