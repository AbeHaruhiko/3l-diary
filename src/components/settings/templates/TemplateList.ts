/// <reference path='../../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'
import { API_ENDPOINT, PAGE_SIZE } from '../../../App'
import { clearAuthData, setTemplates } from '../../../vuex/actions'
import Navbar from '../../navbar/Navbar'

import * as axios from 'axios';   // d.tsがあるとimportで書ける。ないと var axios = require('axios')

@VueComponent({
  template: require('./TemplateList.html'),
  components: {
    'navbar': Navbar,
  },
  vuex: { // ここで追加せずに、importしたactionを直接呼び出しても、apply of undifined的なメッセージが出てactionは実行されない。import, annotation, field, callの4箇所必要！
    actions: { clearAuthData, setTemplates }
  },
  route: {
    canReuse: false   // 既存編集と新規投稿を行き来するときがあるので。
  },
})
export default class {

  // firebaseRef: Firebase

  $route   // これがないとthis.$routeがTSコンパイルエラー。vue-router.d.tsに定義されているのでどうにかなりそうだけど・・・。
  $store
  clearAuthData: Function  // @VueComponentのvuex.actionはクラスのプロパティに設定されるので、thisで参照できるよう宣言。
  setTemplates: Function  // @VueComponentのvuex.actionはクラスのプロパティに設定されるので、thisで参照できるよう宣言。

  data(): any {
    return {
      templates: []
    }
  }

  created() {

    // if (this.$route.query.q) {
      
    //   request
    //     .get(API_ENDPOINT + "/posts")
    //     .set('x-auth-token', this.$store.state.authData.token)
    //     .query({ page: this.$route.query.page || 0 })
    //     .query({ size: this.$route.query.size || PAGE_SIZE })
    //     .query({ q: this.$route.query.q })
    //     .end((err, response) => {
    //       if (err) {
    //         if (err.status === 401) {
    //           this.clearAuthData()
    //           this.$route.router.go('/login')
    //           return
    //         }
    //         throw err
    //       }
    //       console.log(response.body)
    //       this.setDiaries(response.body)
    //     })
    // } else {
      
    //   request
    //     .get(API_ENDPOINT + "/posts")
    //     .set('x-auth-token', this.$store.state.authData.token)
    //     .query({ page: this.$route.query.page || 0 })
    //     .query({ size: this.$route.query.size || PAGE_SIZE })
    //     .end((err, response) => {
    //       if (err) {
    //         if (err.status === 401) {
    //           this.clearAuthData()
    //           this.$route.router.go('/login')
    //           return
    //         }
    //         throw err
    //       }
    //       console.log(response.body)
    //       this.setDiaries(response.body)
    //     })
    // }
    
    // 過去の日記の取得
    var axiosInstance = axios.create({
      baseURL: API_ENDPOINT,
      headers: { 'x-auth-token': this.$store.state.authData.token }
    });
    axiosInstance.get('/templates')
      .then((response) => {
        console.log(response.data);
        this.setTemplates(response.data)
      })
      .catch((response) => {
        console.log(response.data);
        if (response.status === 401) {
          this.clearAuthData()
          this.$route.router.go('/login')
          return
        }
      })
  }
}
