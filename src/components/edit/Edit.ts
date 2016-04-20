/// <reference path='../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'
import { API_ENDPOINT, URL_PATH_POSTS } from '../../App'
import Navbar from '../navbar/Navbar'
import { clearAuthData } from '../../vuex/actions'

var _ = require('lodash')
var request = require('superagent')
import * as axios from 'axios';   // d.tsがあるとimportで書ける。ないと var axios = require('axios')

@VueComponent({
  template: require('./Edit.html'),
  components: {
    'navbar': Navbar
  },
  route: {
    canReuse: false   // 既存編集と新規投稿を行き来するときがあるので。
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
      diary: {}   // 無いとブラウザリロードでまっしろ
    }
  }

  ready() {
    console.log('ready')
  }

  created() {
    // 既存日記の編集でない（＝新規投稿）場合
    if (!this.$route.params.post_id) {
      return
    }
    
    this.diaryUrl = "/posts/" + this.$route.params.post_id
    
    if (this.$store.state.diaries.length > 0) {
      this.diary = _.find(this.$store.state.diaries, { 'id': this.$route.params.post_id })
    } else {
      
      axios({
        method: 'get',
        url: this.diaryUrl,
      })
      .then((response) => {
        this.diary = response.data
      })
      .catch((error) => {
      });
    }
  }

  save() {
    
    let method: string;
    let url: string;
    if (!this.$route.params.post_id) {
      // 既存テンプレートの編集でない（＝新規作成）場合

      method = 'post'
      url = '/posts'
    } else {
      method = 'put'
      url = this.diaryUrl
    }
    
    axios({
      method: method,
      url: url,
      data: this.diary
    })
    .then((response) => {
      console.log(response.data);
      this.$route.router.go(URL_PATH_POSTS)
    })
    .catch((error) => {
    });

    
    // // 既存日記の編集でない（＝新規投稿）場合
    // if (!this.$route.params.post_id) {
    //   request
    //     .post(API_ENDPOINT + "/posts")
    //     .set('x-auth-token', this.$store.state.authData.token)
    //     .set('Accept', 'application/json')
    //     .set('Content-Type', 'application/json')
    //     .send({ body: this.diary.body })
    //     .send({ username: this.$store.state.authData.username })
    //     .end((err, response) => {
    //       if (err) {
    //         if (err.status === 401) {
    //           this.clearAuthData()
    //           this.$route.router.go('/login')
    //           return
    //         }
    //         throw err
    //       }
    //       console.log(response)
    //       this.$route.router.go(URL_PATH_POSTS)
    //     })      
    // } else {
    //   request
    //     .put(this.diaryUrl)
    //     .set('x-auth-token', this.$store.state.authData.token)
    //     .set('Accept', 'application/json')
    //     .set('Content-Type', 'application/json')
    //     .send({ body: this.diary.body })
    //     .send({ createdAt: this.diary.createdAt })  // 更新しないので元の値をセット（ださい）
    //     .send({ username: this.$store.state.authData.username })
    //     .end((err, response) => {
    //       if (err) {
    //         if (err.status === 401) {
    //           this.clearAuthData()
    //           this.$route.router.go('/login')
    //           return
    //         }
    //         throw err
    //       }
    //       console.log(response)
    //       this.$route.router.go(URL_PATH_POSTS)
    //     })      
    //   }
  }
}
