/// <reference path='../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'

import Auth from '../auth/Auth'
import Navbar from '../navbar/Navbar'

// require('imports?jQuery=jquery!bootstrap')

@VueComponent({
  template: require('./Edit.html'),
  components: {
    'navbar': Navbar
  }
})
export default class {

  // firebaseRef: Firebase

  $route   // これがないとthis.$routeがTSコンパイルエラー。vue-router.d.tsに定義されているのでどうにかなりそうだけど・・・。

  templates: string[]
  diaryContent: string

  data(): { msg: string } {
    return {
      msg: 'Hello World!'
    }
  }

  created() {
    // this.firebaseRef = new Firebase('https://3l-diary.firebaseio.com/')
  }

  save() {
    // const authData: FirebaseAuthData = this.firebaseRef.getAuth()
    // const timestamp = new Date().getTime()
    // const post = this.firebaseRef.child('posts').child(authData.uid).push()
    // post.setWithPriority({
    //   content: this.diaryContent,
    //   createdAt: timestamp,
    //   updatedAt: timestamp
    // }, -(timestamp))  // 降順に取得したいので、priorityをtimestampのマイナス値にセットする。

    // request
    //   .put(this.diaryUrl)
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
    //     console.log(response)
    //   })      
  }
}
