// import { API_ENDPOINT } from '../App'
// var request = require('superagent')

export const setAuthData = makeAction('SET_AUTH_DATA')
export const clearAuthData = makeAction('CLEAR_AUTH_DATA')
export const setDiaries = makeAction('SET_DIARIES')
export const setPastDiaries = makeAction('SET_PAST_DIARIES')
export const setTemplates = makeAction('SET_TEMPLATES')

export const addTodo = makeAction('ADD_TODO')
export const deleteTodo = makeAction('DELETE_TODO')
export const toggleTodo = makeAction('TOGGLE_TODO')
export const editTodo = makeAction('EDIT_TODO')
export const toggleAll = makeAction('TOGGLE_ALL')
export const clearCompleted = makeAction('CLEAR_COMPLETED')

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}

// export const fetchDiaries = ({ dispatch }, page: number, size: number) => {
//     request
//       .get(API_ENDPOINT + "/posts")
//       .set('x-auth-token', this.$store.state.authData.token)
//       .query({ page: page })
//       .query({ size: size })
//       .end((err, response) => {
//         if (err) {
//           if (err.status === 401) {
//             this.clearAuthData()
//             this.$route.router.go('/login')
//             return
//           }
//           throw err
//         }
//         // this.diaries = response.body
//         // this.$store.state.diaries = response.body
//         console.log(response.body)
//         this.setDiaries(response.body)
//         // _(response.body).forEach((diary) => {
          
//         // })
//       })
// }