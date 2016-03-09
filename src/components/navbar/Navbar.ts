/// <reference path='../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'
import Auth from '../auth/Auth'

@VueComponent({
  template: require('./Navbar.html'),
})
export default class {

  $route   // これがないとthis.$routeがTSコンパイルエラー。vue-router.d.tsに定義されているのでどうにかなりそうだけど・・・。

  logout(): void {
    new Auth().logout(this.$route)
  }
}
