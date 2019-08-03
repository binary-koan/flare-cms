import { createStore, combineReducers } from "redux"
import formReducer from "./form/reducer"
import listReducer from "./list/reducer"
import { State, Action } from "./types"

const store = createStore<State, Action, unknown, unknown>(
  combineReducers({ form: formReducer, list: listReducer })
)
export default store
