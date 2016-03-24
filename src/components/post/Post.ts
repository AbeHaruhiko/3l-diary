/// <reference path='../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'

import Navbar from '../navbar/Navbar'

var _ = require('lodash')

@VueComponent({
  template: require('./Post.html'),
  components: {
    'navbar': Navbar
  }
})
export default class {

  // firebaseRef: Firebase

  $route   // これがないとthis.$routeがTSコンパイルエラー。vue-router.d.tsに定義されているのでどうにかなりそうだけど・・・。
  $store

  diary: any

  data(): any {
    return {
      msg: 'Hello World!',
      diary: {}
    }
  }

  created() {
    // this.firebaseRef = new Firebase('https://3l-diary.firebaseio.com/')
    // const authData: FirebaseAuthData = this.firebaseRef.getAuth()
    // if (authData) {
    //   this.firebaseRef.child('posts').child(authData.uid).child(this.$route.params.post_id).once('value')
    //   .then((diary) => {
    //     this.diary = diary
    //     console.log(this.diary)
    //     console.log(this.diary.val())
    //   })
    // }
    
    this.diary = _.find(this.$store.state.diaries, { 'id': this.$route.params.post_id })
  }

  // get createdAt() {
  //   if (this.diary.val) {
  //     return this.diary.val().createdAt
  //   } else {
  //     return ''
  //   }
  // }

  // get content() {
  //   if (this.diary.val) {
  //     return this.diary.val().content
  //   } else {
  //     return ''
  //   }
  // }
}
