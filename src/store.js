import { createStore } from 'redux'

const defaultState = {
  users: []
}

export const setUsers = (users) => ({
  type: "users/usersFetched",
  payload: users
})

const reducer = (state = defaultState, action) => {
  if (action.type === "users/usersFetched") {
    return {...state, users: action.payload}
  } 

  return state
}

const store = createStore(reducer)

export default store