/// <reference path='../../../typings/browser.d.ts' />

'use strict'

import VueComponent from 'vue-class-component'
import { API_ENDPOINT, URL_PATH_POSTS, PAGE_SIZE } from '../../App'
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
    
    MAX_PAGINATION_COUNT: number    // ページネーションは8個
    MAX_PAGINATION_INDEX: number
    BACKWORD_PAGINATION_COUNT: number   // 戻る方向のページネーションの数
    FORWORD_PAGINATION_COUNT: number    // 進む方向のページネーションの数

    data () {
      return {
        MAX_PAGINATION_COUNT: 8,    // ページネーションは8個
        MAX_PAGINATION_INDEX: 7,
        BACKWORD_PAGINATION_COUNT: 4,   // 戻る方向のページネーションの数
        FORWORD_PAGINATION_COUNT: 3    // 進む方向のページネーションの数
      }
    }

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
      // ページ数が少ないとき用（8ページ以下の時は常に1～totalPagesを表示）
      if (this.totalPages <= this.MAX_PAGINATION_COUNT) {
        return 0
      }
      // 現在ページが末尾に近い時にページリストが短くならないように
      if (this.currentPageNumber - this.BACKWORD_PAGINATION_COUNT >= this.totalPages - this.MAX_PAGINATION_INDEX) {
        return this.totalPages - this.MAX_PAGINATION_INDEX
      }
      return Math.max(0, this.currentPageNumber - this.BACKWORD_PAGINATION_COUNT) 
    }
    
    get tailOfPagination() {
      // ページ数が少ないとき用（8ページ以下の時は常に1～totalPagesを表示）
      if (this.totalPages <= this.MAX_PAGINATION_COUNT) {
        return this.totalPages - 1
      }
      // 現在ページが若い時にページリストが短くならないように
      if (this.currentPageNumber + this.FORWORD_PAGINATION_COUNT <= this.MAX_PAGINATION_INDEX) {
        return this.MAX_PAGINATION_INDEX
      }
      return Math.min(this.totalPages - 1, this.currentPageNumber + this.FORWORD_PAGINATION_COUNT) 
    }
    
    // fetchDiaries(page: number, size: number = PAGE_SIZE) {
    //   request
    //   .get(API_ENDPOINT + "/posts")
    //   .set('x-auth-token', this.$store.state.authData.token)
    //   .query({ page: page })
    //   .query({ size: size })
    //   .end((err, response) => {
    //     if (err) {
    //       if (err.status === 401) {
    //         this.clearAuthData()
    //         this.$route.router.push('/login')
    //         return
    //       }
    //       throw err
    //     }
    //     console.log(response.body)
    //     this.setDiaries(response.body)
    //     this.$route.router.push({ path: URL_PATH_POSTS, query: { page: page } })
    //   })

    // }
    
    isCurrentPage(pageNumber: number) {
      return pageNumber === this.currentPageNumber
    }
}
