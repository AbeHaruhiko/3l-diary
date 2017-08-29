import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import request from 'superagent'
import firebase from 'firebase'
import firebaseui from 'firebaseui'

import router from '../router'
import * as consts from '../consts/consts'

import {Posts} from '../types/Posts'


Vue.use(Vuex)

// 3l-diary用Stateの型定義
interface DiaryState {
  message: string
  posts: Posts
  route: VueRouter.Route
  currentUser: firebase.User
  firebaseApp: firebase.app.App
  firebaseUiApp: firebaseui.auth.AuthUI
}

// root state object.
// each Vuex instance is just a single state tree.
const state: DiaryState = {
  message: null,
  posts: null,
  route: null,
  currentUser: null,
  firebaseApp: null,
  firebaseUiApp: null,
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
  setPosts (state, posts: Posts) {
    state.posts = posts
  },
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
  setFirebaseApp(state, firebaseApp) {
    state.firebaseApp = firebaseApp;
  },
  setFirebaseUiApp(state, firebaseUiApp) {
    state.firebaseUiApp = firebaseUiApp;
  },
}

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {

  getPosts ({ commit }, payload: { router: VueRouter }) {
    if (!state.currentUser) {
      // console.log(state.route)
      // console.log(payload.router)
      // payload.router.push('/auth')
    } else {
      state.currentUser.getIdToken(/* forceRefresh */ true).then(idToken => {
       console.log(idToken)
        request
          .get(consts.API_ENDPOINT + 'posts')
          .set('X-Authorization-Firebase', idToken)
          .end((err, res) => {
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
}

// getters are functions
const getters = {
  getMessage: () => state.message,
  currentUser: () => state.currentUser,
  firebaseApp: () => state.firebaseApp,
  firebaseUiApp: () => state.firebaseUiApp,
  getPostById: (state, getters) => (id) => {
    return state.posts.content.find(post => post.id === id)
  }
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})