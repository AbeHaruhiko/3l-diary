/// <reference path='../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'
import { API_ENDPOINT, PAGE_SIZE } from '../../App'
import { clearAuthData, setDiaries } from '../../vuex/actions'

var request = require('superagent')

@VueComponent({
  template: require('./Pagination.html'),
  vuex: { // ここで追加せずに、importしたactionを直接呼び出しても、apply of undifined的なメッセージが出てactionは実行されない。import, annotation, field, callの4箇所必要！
    actions: { clearAuthData, setDiaries }
  }
})
export default class {
    $route
    $store
    clearAuthData: Function
    setDiaries: Function
    
    created() {
      // const totalPages = this.$store.state.diaries.totalPages
      // const totalElements = this.$store.state.diaries.totalElements
      // const number = this.$store.state.diaries.number
      // const numberOfElements = this.$store.state.diaries.numberOfElements
      // const size = this.$store.state.diaries.size
      // const first = this.$store.state.diaries.first
      // const last = this.$store.state.diaries.last
      
      
    }
    
    get totalPages() {
      return this.$store.state.diaries.totalPages
    }
    
    get currentPageNumber() {
      return this.$store.state.diaries.number
    }
    
    get isFirstPage() {
      return this.$store.state.diaries.first
    }
    
    get isLastPage() {
      return this.$store.state.diaries.last
    }
    
    /**
     * 前へボタンの状態（disabled or ''）
     */
    get prevButtonState() {
      // プロパティ参照は()いらない。
      return this.isFirstPage ? 'disabled' : ''
    }
    
    /**
     * 次へボタンの状態（disabled or ''）
     */
    get nextButtonState() {
      // プロパティ参照は()いらない。
      return this.isLastPage ? 'disabled' : ''
    }
    
    get headOfPagination() {
      return Math.max(0, this.currentPageNumber - 4) 
    }
    
    get tailOfPagination() {
      return Math.min(this.totalPages - 1, this.currentPageNumber + 3) 
    }
    
    fetchDiaries(page: number, size: number = PAGE_SIZE) {
      request
      .get(API_ENDPOINT + "/posts")
      .set('x-auth-token', this.$store.state.authData.token)
      .query({ page: page })
      .query({ size: size })
      .end((err, response) => {
        if (err) {
          if (err.status === 401) {
            this.clearAuthData()
            this.$route.router.go('/login')
            return
          }
          throw err
        }
        console.log(response.body)
        this.setDiaries(response.body)
      })

    }
}
