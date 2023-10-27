const initialState = 0

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + action.payload
    case "DECREMENT":
      return state - action.payload    
    default:
      return state
  }
}

const userState = {
  userData: {},
}

export const UserDataReducer = (state = userState, action) => {
  switch (action.type) {
    case "USERDATA":
      return {...state, userData: action.payload}
    default:
      return state
  }
}
