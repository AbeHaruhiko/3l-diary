/// <reference path='../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'

// require('imports?jQuery=jquery!bootstrap')

@VueComponent({
  template: require('./PostListItem.html'),
  props: {
    diary: {}
  }
})
export default class {

  // firebaseRef: Firebase

  // $route   // これがないとthis.$routeがTSコンパイルエラー。vue-router.d.tsに定義されているのでどうにかなりそうだけど・・・。
  // $state

  // // props内のオブジェクトにアクセスしたいときは、クラスのプロパティとして定義して、thisでアクセス。
  // diary: any

  // data(): any {
  //   return {
  //     msg: 'Hello World!',
  //     // diary: {}
  //   }
  // }

  // created() {
  //   this.firebaseRef = new Firebase('https://3l-diary.firebaseio.com/')
  // }

  // // props内のオブジェクトにアクセスしたいときは、クラスのプロパティとして定義して、thisでアクセス。
  // get postId(): string {
  //   return this.diary.key()
  // }
}
