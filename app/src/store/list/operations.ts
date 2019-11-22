import { Dispatch } from "redux"
import { Action, State } from "../types"
import { documentsService } from "../feathers"
import { ListFilter } from "./types"
import store from ".."

export async function loadData(dispatch: Dispatch<Action>, state: State) {
  dispatch({ namespace: "list", type: "loadData" })

  console.log("data", state.list.filters, {
    query: {
      $and: buildFilterParams(state.list.filters)
    }
  })

  try {
    const data = await documentsService.find({
      query: {
        $and: buildFilterParams(state.list.filters)
      }
    })

    dispatch({ namespace: "list", type: "dataLoaded", data })
  } catch (error) {
    dispatch({ namespace: "list", type: "loadError", error: error.message })
  }
}

export async function filterData(
  dispatch: Dispatch<Action>,
  state: State,
  { filterIndex, filter }: { filterIndex: number; filter: ListFilter }
) {
  const filters = [...(state.list.filters ?? [])]

  filters[filterIndex] = filter

  console.log(filterIndex, filters)

  dispatch({ namespace: "list", type: "setFilters", filters })

  await loadData(dispatch, store.getState())
}

const buildFilterParams = (filters: ListFilter[] = []) => {
  return filters.map(filter => {
    if (filter.attributes.length === 1) {
      return simpleFilterParam(filter, filter.attributes[0])
    } else {
      return { $or: filter.attributes.map(attribute => simpleFilterParam(filter, attribute)) }
    }
  })
}

const simpleFilterParam = (filter: ListFilter, attribute: string) => {
  return { [`data.${attribute}`]: { [filter.operator]: filter.value } }
}
