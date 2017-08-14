/// <reference path='../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'
import { API_ENDPOINT, URL_PATH_POSTS } from '../../App'
import Navbar from '../navbar/Navbar'
import { clearAuthData, setTemplates } from '../../vuex/actions'

var _ = require('lodash')
var request = require('superagent')
import * as axios from 'axios';   // d.tsがあるとimportで書ける。ないと var axios = require('axios')

@VueComponent({
  template: require('./Edit.html'),
  components: {
    'navbar': Navbar
  },
  route: {
  },
  vuex: { // ここで追加せずに、importしたactionを直接呼び出しても、apply of undifined的なメッセージが出てactionは実行されない。
    actions: { clearAuthData, setTemplates }
  }
})
export default class {

  // firebaseRef: Firebase

  $route   // これがないとthis.$routeがTSコンパイルエラー。vue-router.d.tsに定義されているのでどうにかなりそうだけど・・・。
  $store
  clearAuthData: Function  // @VueComponentのvuex.actionはクラスのプロパティに設定されるので、thisで参照できるよう宣言。
  setTemplates: Function   // @VueComponentのvuex.actionはクラスのプロパティに設定されるので、thisで参照できるよう宣言。

  diary: any
  diaryUrl: string
  
  currentTemplate

  data(): any {
    return {
      diary: {},   // 無いとブラウザリロードでまっしろ,
      currentTemplate: {
        templateItems: [  // デフォルト値
          { body: '今日いちばん失敗したこと'},
          { body: '今日いちばん感動したこと'},
          { body: '明日の目標'}
        ]
      },   // 無いとブラウザリロードでまっしろ,
    }
  }

  mounted() {
    console.log('mounted')
  }

  created() {

    // テンプレートの取得
    if (this.$store.state.templates.length > 0) {
      
    } else {
      
      axios({
        method: 'get',
        url: '/templates',
      })
      .then((response) => {
        this.setTemplates(response.data)
      })
      .catch((error) => {
      });
    }

    // 既存日記の編集でない（＝新規投稿）場合
    if (!this.$route.params.post_id) {
      return
    }
    
    this.diaryUrl = "/posts/" + this.$route.params.post_id
    
    // 過去投稿の取得
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
  }
  
  applyTemplate(template: { id: { name: string, templateItems: { id: string, body: string, sequence: number }[], id: string} }) {
    this.currentTemplate = template;
  }
}
