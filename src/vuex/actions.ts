export const setAuthData = makeAction('SET_AUTH_DATA')
export const clearAuthData = makeAction('CLEAR_AUTH_DATA')
export const setDiaries = makeAction('SET_DIARIES')

export const addTodo = makeAction('ADD_TODO')
export const deleteTodo = makeAction('DELETE_TODO')
export const toggleTodo = makeAction('TOGGLE_TODO')
export const editTodo = makeAction('EDIT_TODO')
export const toggleAll = makeAction('TOGGLE_ALL')
export const clearCompleted = makeAction('CLEAR_COMPLETED')

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}