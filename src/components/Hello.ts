/// <reference path='../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'

@VueComponent({
  template: require('./Hello.html')
})
export default class {
  data(): { msg: string } {
    return {
      msg: 'Hello World!'
    }
  }
}
