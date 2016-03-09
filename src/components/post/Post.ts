/// <reference path='../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'

// require('imports?jQuery=jquery!bootstrap')

@VueComponent({
  template: require('./Post.html'),
  props: {
    diary: {}
  }
})
export default class {

  firebaseRef: Firebase

  $route   // これがないとthis.$routeがTSコンパイルエラー。vue-router.d.tsに定義されているのでどうにかなりそうだけど・・・。

  // diary: { content: string, createdAt: Date, updatedAt: Date }

  data(): any {
    return {
      msg: 'Hello World!',
      // diary: {}
    }
  }

  created() {
    this.firebaseRef = new Firebase('https://3l-diary.firebaseio.com/')
    // const uid = this.firebaseRef.getAuth().uid
    // console.log('uid: ' + uid)
    // this.firebaseRef.child('posts/' + this.firebaseRef.getAuth().uid)
    // // .orderByPriority()
    // .orderByChild('')
    // // .startAt(0)
    // .limit(2)
    // .on('child_added', (post) => {
    //   console.log(post.val())
    //   post.forEach((post) => {
    //     this.diaries.push(post.val())
    //   })
    // })
  }
}
