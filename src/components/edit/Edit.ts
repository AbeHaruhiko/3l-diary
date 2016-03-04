/// <reference path='../../../typings/tsd.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'

require('imports?jQuery=jquery!bootstrap')

@VueComponent({
  template: require('./Edit.html')
})
export default class {

  diaryContent: string;

  data(): { msg: string } {
    return {
      msg: 'Hello World!'
    }
  }
}
