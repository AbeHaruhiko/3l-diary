/// <reference path='../../../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'
import { API_ENDPOINT, URL_PATH_TEMPLATES } from '../../../../App'
import Navbar from '../../../navbar/Navbar'
import { clearAuthData } from '../../../../vuex/actions'

var _ = require('lodash')
var request = require('superagent')

@VueComponent({
  template: require('./TemplateEdit.html'),
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

  diaryTemplate: any
  diaryTemplateUrl: string

  data(): any {
    return {
      diaryTemplate: {
        templateItems: [ {}, {}, {} ]
      }   // 無いとブラウザリロードでまっしろ
    }
  }

  ready() {
    console.log('ready')
  }

  created() {
    // 既存テンプレートの編集でない（＝新規作成）場合
    if (!this.$route.params.template_id) {
      return
    }
    
    this.diaryTemplateUrl = API_ENDPOINT + '/templates/' + this.$route.params.template_id
    
    if (this.$store.state.templates.length > 0) {
      this.diaryTemplate = _.find(this.$store.state.templates, { 'id': this.$route.params.template_id })
    } else {
      request
        .get(this.diaryTemplateUrl)
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
          this.diaryTemplate = response.body
        })
    }
  }

  save() {
    // 既存テンプレートの編集でない（＝新規作成）場合
    
    for (let i = 0; i < this.diaryTemplate.templateItems.length; i++) {
      this.diaryTemplate.templateItems[i].sequence = i + 1;
    }
    
    if (!this.$route.params.template_id) {
      request
        .post(API_ENDPOINT + '/templates')
        .set('x-auth-token', this.$store.state.authData.token)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ name: this.diaryTemplate.name })
        .send({ username: this.$store.state.authData.username })
        .send({ templateItems: this.diaryTemplate.templateItems })
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
          this.$route.router.go(URL_PATH_TEMPLATES)
        })      
    } else {
      request
        .put(this.diaryTemplateUrl)
        .set('x-auth-token', this.$store.state.authData.token)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ body: this.diaryTemplate.body })
        .send({ createdAt: this.diaryTemplate.createdAt })
        .send({ username: this.$store.state.authData.username })
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
          this.$route.router.go(URL_PATH_TEMPLATES)
        })      
      }
  }
}
