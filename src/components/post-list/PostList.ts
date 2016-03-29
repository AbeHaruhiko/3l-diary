/// <reference path='../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'
import { API_ENDPOINT, PAGE_SIZE } from '../../App'
import { clearAuthData, setDiaries } from '../../vuex/actions'
import Navbar from '../navbar/Navbar'
import Pagination from '../pagination/Pagination'
import Post from '../post-list-item/PostListItem'

var request = require('superagent')

@VueComponent({
  template: require('./PostList.html'),
  components: {
    'post': Post,
    'navbar': Navbar,
    'pagination': Pagination
  },
  vuex: { // ここで追加せずに、importしたactionを直接呼び出しても、apply of undifined的なメッセージが出てactionは実行されない。import, annotation, field, callの4箇所必要！
    actions: { clearAuthData, setDiaries }
  }
})
export default class {

  // firebaseRef: Firebase

  $route   // これがないとthis.$routeがTSコンパイルエラー。vue-router.d.tsに定義されているのでどうにかなりそうだけど・・・。
  $store
  clearAuthData: Function  // @VueComponentのvuex.actionはクラスのプロパティに設定されるので、thisで参照できるよう宣言。
  setDiaries: Function  // @VueComponentのvuex.actionはクラスのプロパティに設定されるので、thisで参照できるよう宣言。

  data(): any {
    return {
      diaries: []
    }
  }

  created() {
    // this.firebaseRef = new Firebase('https://3l-diary.firebaseio.com/')
    // // const uid = this.firebaseRef.getAuth().uid
    // // console.log('uid: ' + uid)
    // this.firebaseRef.child('posts/' + this.firebaseRef.getAuth().uid)
    // .on('child_added', (post) => {
    //   console.log(post.key())
    //   console.log(post.val())
    //   this.diaries.push(post)
    // })
    request
      .get(API_ENDPOINT + "/posts")
      .set('x-auth-token', this.$store.state.authData.token)
      .query({ page: 0 })
      .query({ size: PAGE_SIZE })
      .end((err, response) => {
        if (err) {
          if (err.status === 401) {
            this.clearAuthData()
            this.$route.router.go('/login')
            return
          }
          throw err
        }
        // this.diaries = response.body
        // this.$store.state.diaries = response.body
        console.log(response.body)
        this.setDiaries(response.body)
        // _(response.body).forEach((diary) => {
          
        // })
      })
  }
}
