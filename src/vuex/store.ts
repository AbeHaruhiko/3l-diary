/// <reference path='../../typings/browser.d.ts' />

import Vue =  require('vue')
var Vuex = require('vuex')
import middlewares from './middlewares'

Vue.use(Vuex)

export const STORAGE_KEY = '3l-diary-authData'

// const state = {
//   root: JSON.parse(localStorage.getItem(STORAGE_KEY) || 
//     `{
//       "diaries": [],
//       "authData": {
//         "username": "",
//         "token": ""
//       }
//     }`)
// }
const state = {
  authData: JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"),
  diaries: []
}

const mutations = {
  
  SET_AUTH_DATA (state, username, token) {
    state.authData.username = username
    state.authData.token = token
  },
  
  CLEAR_AUTH_DATA (state) {
    state.authData = {}
  },
  
  SET_DIARIES (state, diaries: { id: string, body: string, username: string, createdAt: string, updatedAt: string }[]) {
    state.diaries = diaries
  },
  
  ADD_TODO (state, text) {
    state.todos.push({
      text: text,
      done: false
    })
  },

  DELETE_TODO (state, todo) {
    state.todos.$remove(todo)
  },

  TOGGLE_TODO (state, todo) {
    todo.done = !todo.done
  },

  EDIT_TODO (state, todo, text) {
    todo.text = text
  },

  TOGGLE_ALL (state, done) {
    state.todos.forEach((todo) => {
      todo.done = done
    })
  },

  CLEAR_COMPLETED (state) {
    state.todos = state.todos.filter(todo => !todo.done)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  strict: process.env.NODE_ENV === 'dev',
  middlewares
})