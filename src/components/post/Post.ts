/// <reference path='../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'
import { API_ENDPOINT } from '../../App'
import Navbar from '../navbar/Navbar'
import { setDiaries } from '../../vuex/actions'

var _ = require('lodash')
var request = require('superagent')

@VueComponent({
  template: require('./Post.html'),
  components: {
    'navbar': Navbar
  },
  vuex: { // ここで追加せずに、importしたactionを直接呼び出しても、apply of undifined的なメッセージが出てactionは実行されない。
    actions: { setDiaries }
  }
})
export default class {

  // firebaseRef: Firebase

  $route   // これがないとthis.$routeがTSコンパイルエラー。vue-router.d.tsに定義されているのでどうにかなりそうだけど・・・。
  $store
  setDiaries: Function  // @VueComponentのvuex.actionはクラスのプロパティに設定されるので、thisで参照できるよう宣言。

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
    
    if (this.$store.state.diaries.length > 0) {
      this.diary = _.find(this.$store.state.diaries, { 'id': this.$route.params.post_id })
    } else {
      request
        .get(API_ENDPOINT + "/posts/" + this.$route.params.post_id)
        .set('x-auth-token', this.$store.state.authData.token)
        .end((err, response) => {
          if (err) {
            throw err
          }
          this.diary = response.body
        })
    }
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
