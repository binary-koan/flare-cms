import { Dispatch } from "redux"
import { Action } from "../types"
import { documentsService } from "../feathers"

export async function loadData(dispatch: Dispatch<Action>, { id }: { id: string }) {
  dispatch({ namespace: "form", type: "loadData" })

  try {
    const data = await documentsService.get(id)

    dispatch({ namespace: "form", type: "dataLoaded", data })
  } catch (error) {
    dispatch({ namespace: "form", type: "loadError", error: error.message })
  }
}
