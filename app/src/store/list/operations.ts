import { Dispatch } from "redux"
import { Action } from "../types"
import { documentsService } from "../feathers"

export async function loadData(dispatch: Dispatch<Action>) {
  dispatch({ namespace: "list", type: "loadData" })

  try {
    const data = await documentsService.find()

    dispatch({ namespace: "list", type: "dataLoaded", data })
  } catch (error) {
    dispatch({ namespace: "list", type: "loadError", error: error.message })
  }
}
