import { Reducer } from "redux"
import set from "lodash/set"
import clone from "lodash/clone"
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
      return {
        loadingState: "loaded",
        loadedData: action.data,
        fieldValues: action.data.current.data
      }
    case "loadError":
      return { loadingState: "error", error: action.error }
    case "edit":
      return { ...state, fieldValues: set(clone(state.fieldValues), action.path, action.value) }
    case "saveDraft":
      return state.loadingState === "loaded" ? { ...state, savingState: "saving" } : state
    case "draftSaved":
      return state.loadingState === "loaded"
        ? {
            ...state,
            savingState: undefined,
            loadedData: action.data,
            fieldValues: action.data.current.data
          }
        : state
  }
}

export default reducer
