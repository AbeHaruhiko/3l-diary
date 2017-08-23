import Vue from 'vue'
import Vuex from 'vuex'
import request from 'superagent'

import * as consts from '../consts/consts'

import {Post} from '../types/Post'


Vue.use(Vuex)

// 3l-diary用Stateの型定義
interface DiaryState {
  message: string
  posts: Post[]
}

// root state object.
// each Vuex instance is just a single state tree.
const state: DiaryState = {
  message: null,
  posts: []
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  setMessage (state, message: string) {
    state.message = message
  },
  setPosts (state, posts: Post[]) {
    state.posts = posts
  },
}

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {

  getPosts ({ commit }, firebase) {
    firebase.firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
      request
        .get(consts.API_ENDPOINT + 'posts')
        .set('X-Authorization-Firebase', idToken)
        .end(function (err, res) {
          if (err) throw err
          console.log(res.body)
          commit('setPosts', res.body)
        })
    }).catch(error => {
      // Handle error
      console.log(error)
    })
  }
}

// getters are functions
const getters = {
  getMessage: string => () => state.message
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})