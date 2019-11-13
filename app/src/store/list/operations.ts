import { Dispatch } from "redux"
import { Action, State } from "../types"
import { documentsService } from "../feathers"
import { ListFilter } from "./types"

export async function loadData(dispatch: Dispatch<Action>, state: State) {
  dispatch({ namespace: "list", type: "loadData" })

  try {
    const data = await documentsService.find(buildFilterParams(state.list.filters || []))

    dispatch({ namespace: "list", type: "dataLoaded", data })
  } catch (error) {
    dispatch({ namespace: "list", type: "loadError", error: error.message })
  }
}

export async function filterData(
  dispatch: Dispatch<Action>,
  state: State,
  { filters }: { filters: ListFilter[] }
) {
  dispatch({ namespace: "list", type: "setFilters", filters })

  await loadData(dispatch, state)
}

const buildFilterParams = (filters: ListFilter[]) =>
  filters.reduce(
    (object, filter) => {
      if (object[filter.attribute]) {
        object[filter.attribute][filter.operator] = filter.value
      } else {
        object[filter.attribute] = { [filter.operator]: filter.value }
      }

      return object
    },
    {} as { [key: string]: { [operation: string]: string } }
  )
