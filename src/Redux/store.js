import { combineReducers, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { counterReducer } from "./Reducer/CounterReducer"
import { AuthReducer } from "./Reducer/AuthReducer"
import { SignUpDataReducer } from "./Reducer/SignUpDataReducer"
import { UserDataReducer } from "./Reducer/CounterReducer"

const rootReducer = combineReducers({
  counterReducer,
  AuthReducer,
  SignUpDataReducer,
  UserDataReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
