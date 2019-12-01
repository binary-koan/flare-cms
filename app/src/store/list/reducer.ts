import { Reducer } from "redux"
import { ListState, ListFilter } from "./types"
import { Action } from "../types"

const initialState: ListState = { loadingState: "loading" }

const reducer: Reducer<any, Action> = (state = initialState, action) => {
  if (action.namespace !== "list") {
    return state
  }

  switch (action.type) {
    case "loadData":
      return { ...state, loadingState: "loading" }
    case "dataLoaded":
      return { ...state, loadingState: "loaded", data: action.data }
    case "loadError":
      return { ...state, loadingState: "error", error: action.error }
    case "setFilters":
      return {
        ...state,
        filters: action.filters
      }
  }
}

export default reducer
