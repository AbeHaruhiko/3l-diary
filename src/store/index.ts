import Vue from 'vue'
import Vuex from 'vuex'

import * as consts from '../consts/consts'


Vue.use(Vuex)


// 3l-diary用Stateの型定義
interface DiaryState {
  message: string
}

// root state object.
// each Vuex instance is just a single state tree.
const state: DiaryState = {
  message: null
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  setMessage (state, message: string) {
    state.message = message
  }
}

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {

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