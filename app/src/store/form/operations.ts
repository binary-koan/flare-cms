import { Dispatch } from "redux"
import { Action } from "../types"
import { documentsService, revisionsService } from "../feathers"
import { FormState } from "./types"

export async function loadData(dispatch: Dispatch<Action>, { id }: { id: string }) {
  dispatch({ namespace: "form", type: "loadData" })

  try {
    const data = await documentsService.get(id)

    dispatch({ namespace: "form", type: "dataLoaded", data })
  } catch (error) {
    dispatch({ namespace: "form", type: "loadError", error: error.message })
  }
}

export async function saveDraft(
  dispatch: Dispatch<Action>,
  { loadedData, fieldValues }: Pick<FormState, "loadedData" | "fieldValues">
) {
  dispatch({ namespace: "form", type: "saveDraft" })

  try {
    const draft = loadedData.revisions.find(
      (revision: any) => !revision.liveFrom && !revision.liveUntil
    )

    if (draft) {
      await revisionsService.patch(draft.id, fieldValues)
    } else {
      await revisionsService.create({
        documentId: loadedData.id,
        documentType: loadedData.type,
        documentCreatedAt: loadedData.createdAt,
        data: fieldValues
      })
    }

    const data = await documentsService.get(loadedData.id)

    dispatch({ namespace: "form", type: "draftSaved", data })
  } catch (error) {
    dispatch({ namespace: "form", type: "loadError", error: error.message })
  }
}
