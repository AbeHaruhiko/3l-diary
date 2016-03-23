/// <reference path='../../typings/browser.d.ts' />

import Vue =  require('vue')
var Vuex = require('vuex')

Vue.use(Vuex)

const state = {
  todos: JSON.parse('[]'),
  authData: {
    username: '',
    token: ''
  }
}

const mutations = {
  
  SET_AUTH_DATA (state, username, token) {
    state.authData.username = username
    state.authData.token = token
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
  strict: process.env.NODE_ENV === 'dev'
})