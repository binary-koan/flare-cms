import { Reducer } from "redux"
import set from "lodash/set"
import { FormState } from "./types"
import { Action } from "../types"

const initialState: FormState = { loadingState: "loading" }

const reducer: Reducer<FormState, Action> = (state = initialState, action) => {
  if (action.namespace !== "form") {
    return state
  }

  switch (action.type) {
    case "loadData":
      return { loadingState: "loading" }
    case "dataLoaded":
      return { loadingState: "loaded", originalData: action.data, currentData: action.data }
    case "loadError":
      return { loadingState: "error", error: action.error }
    case "edit":
      return { ...state, currentData: set(state.currentData, action.path, action.value) }
  }
}

export default reducer
