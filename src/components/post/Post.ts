/// <reference path='../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'
import { API_ENDPOINT } from '../../App'
import Navbar from '../navbar/Navbar'
import { clearAuthData } from '../../vuex/actions'

var _ = require('lodash')
var request = require('superagent')

@VueComponent({
  template: require('./Post.html'),
  components: {
    'navbar': Navbar
  },
  vuex: { // ここで追加せずに、importしたactionを直接呼び出しても、apply of undifined的なメッセージが出てactionは実行されない。
    actions: { clearAuthData }
  }
})
export default class {

  // firebaseRef: Firebase

  $route   // これがないとthis.$routeがTSコンパイルエラー。vue-router.d.tsに定義されているのでどうにかなりそうだけど・・・。
  $store
  clearAuthData: Function  // @VueComponentのvuex.actionはクラスのプロパティに設定されるので、thisで参照できるよう宣言。

  diary: any
  diaryUrl: string

  data(): any {
    return {
      diary: {}   // 無いとブラウザリロードでまっしろになる。
    }
  }

  created() {

    this.diaryUrl = API_ENDPOINT + "/posts/" + this.$route.params.post_id
    
    if (this.$store.state.diaries.length > 0) {
      this.diary = _.find(this.$store.state.diaries, { 'id': this.$route.params.post_id })
    } else {
      request
        .get(this.diaryUrl)
        .set('x-auth-token', this.$store.state.authData.token)
        .end((err, response) => {
          if (err) {
            if (err.status === 401) {
              this.clearAuthData()
              this.$route.router.go('/login')
              return
            }
            throw err
          }
          this.diary = response.body
        })
    }
  }
  
  edit() {
    this.$route.router.go('/edit')
  }
  
  delete() {
    request
      .delete(this.diaryUrl)
      .set('x-auth-token', this.$store.state.authData.token)
      .end((err, response) => {
        if (err) {
          if (err.status === 401) {
            this.clearAuthData()
            this.$route.router.go('/login')
            return
          }
          throw err
        }
        console.log(response)
        this.$route.router.go('/posts')
      })      
  }
}
