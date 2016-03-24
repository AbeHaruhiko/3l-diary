import { STORAGE_KEY } from './store'
var createLogger = require('vuex/logger')

const localStorageMiddleware = {
  onInit (state) {
  },
  onMutation (mutation, state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.authData))
  }
}

export default process.env.NODE_ENV !== 'production'
  ? [createLogger(), localStorageMiddleware]
  : [localStorageMiddleware]