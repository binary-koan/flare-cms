import { Reducer } from "redux"
import { ListState } from "./types"
import { Action } from "../types"

const initialState: ListState = { loadingState: "loading" }

const reducer: Reducer<ListState, Action> = (state = initialState, action) => {
  if (action.namespace !== "list") {
    return state
  }

  switch (action.type) {
    case "loadData":
      return { loadingState: "loading", data: state.data }
    case "dataLoaded":
      return { loadingState: "loaded", data: action.data }
    case "loadError":
      return { loadingState: "error", error: action.error }
  }
}

export default reducer
