import { createStore, combineReducers } from "redux"
import formReducer from "./form/reducer"
import listReducer from "./list/reducer"
import { State, Action } from "./types"

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any
  }
}

const store = createStore<State, Action, unknown, unknown>(
  combineReducers({ form: formReducer, list: listReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store
