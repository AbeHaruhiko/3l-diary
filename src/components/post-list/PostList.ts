/// <reference path='../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'

import Navbar from '../navbar/Navbar'
import Post from '../post-list-item/PostListItem'

@VueComponent({
  template: require('./PostList.html'),
  components: {
    'post': Post,
    'navbar': Navbar
  }
})
export default class {

  firebaseRef: Firebase

  $route   // これがないとthis.$routeがTSコンパイルエラー。vue-router.d.tsに定義されているのでどうにかなりそうだけど・・・。

  diaries: Object[];

  data(): any {
    return {
      diaries: []
    }
  }

  created() {
    this.firebaseRef = new Firebase('https://3l-diary.firebaseio.com/')
    // const uid = this.firebaseRef.getAuth().uid
    // console.log('uid: ' + uid)
    this.firebaseRef.child('posts/' + this.firebaseRef.getAuth().uid)
    .on('child_added', (post) => {
      console.log(post.key())
      console.log(post.val())
      this.diaries.push(post)
    })
  }
}
