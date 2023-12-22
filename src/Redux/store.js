import { combineReducers, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { counterReducer } from "./Reducer/CounterReducer"
import { AuthReducer } from "./Reducer/AuthReducer"
import { SignUpDataReducer } from "./Reducer/SignUpDataReducer"
import {persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  counterReducer,
  AuthReducer,
  SignUpDataReducer,
})



const persistedReducer = persistReducer(persistConfig, rootReducer);



export const store = createStore(persistedReducer, applyMiddleware())
const Persistor = persistStore(store);
export {Persistor};
