/// <reference path='../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'

var moment = require('moment')
moment.locale('ja')

require('./PostListItem.css')

@VueComponent({
  template: require('./PostListItem.html'),
  props: {
    diary: {},
    postType: {}
  }
})
export default class {

  // firebaseRef: Firebase

  // $route   // これがないとthis.$routeがTSコンパイルエラー。vue-router.d.tsに定義されているのでどうにかなりそうだけど・・・。
  // $state

  // props内のオブジェクトにアクセスしたいときは、クラスのプロパティとして定義して、thisでアクセス。
  diary: any

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
  
    get daysAgo(): string {
      if (!this.diary) {
        return ''
      }
      const daysAgo = moment(this.diary.createdAt).fromNow();
      console.log(daysAgo)
      return daysAgo
    }
  }
