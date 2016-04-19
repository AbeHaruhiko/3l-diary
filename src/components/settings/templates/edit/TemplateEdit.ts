/// <reference path='../../../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'
import { API_ENDPOINT, URL_PATH_TEMPLATES } from '../../../../App'
import Navbar from '../../../navbar/Navbar'
import { clearAuthData } from '../../../../vuex/actions'

var _ = require('lodash')
import * as axios from 'axios';   // d.tsがあるとimportで書ける。ないと var axios = require('axios')

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
    
    this.diaryTemplateUrl = '/templates/' + this.$route.params.template_id
    
    if (this.$store.state.templates.length > 0) {
      this.diaryTemplate = _.find(this.$store.state.templates, { 'id': this.$route.params.template_id })
    } else {
      
    axios({
      method: 'get',
      url: this.diaryTemplateUrl,
    })
    .then((response) => {
      this.diaryTemplate = response.data
    })
    .catch((error) => {
    });

      
      // request
      //   .get(this.diaryTemplateUrl)
      //   .set('x-auth-token', this.$store.state.authData.token)
      //   .end((err, response) => {
      //     if (err) {
      //       if (err.status === 401) {
      //         this.clearAuthData()
      //         this.$route.router.go('/login')
      //         return
      //       }
      //       throw err
      //     }
      //     this.diaryTemplate = response.body
      //   })
    }
  }

  save() {
    
    let method: string;
    let url: string;
    if (!this.$route.params.template_id) {
      // 既存テンプレートの編集でない（＝新規作成）場合

      // 連番振る
      for (let i = 0; i < this.diaryTemplate.templateItems.length; i++) {
        this.diaryTemplate.templateItems[i].sequence = i + 1;
      }
    
      method = 'post'
      url = 'templates'
    } else {
      method = 'put'
      url = this.diaryTemplateUrl
    }
    
    axios({
      method: method,
      url: url,
      data: this.diaryTemplate
    })
    .then((response) => {
      console.log(response.data);
      this.$route.router.go(URL_PATH_TEMPLATES)
    })
    .catch((error) => {
    });

  }
}
