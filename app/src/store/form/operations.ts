import { Dispatch } from "redux"
import { Action, State } from "../types"
import { documentsService, revisionsService } from "../feathers"
import { FormState } from "./types"
import { ContentType } from "@shared/types"

export async function loadData(dispatch: Dispatch<Action>, _state: State, { id }: { id: string }) {
  dispatch({ namespace: "form", type: "loadData" })

  try {
    const data = await documentsService.get(id)

    dispatch({ namespace: "form", type: "dataLoaded", data })
  } catch (error) {
    dispatch({ namespace: "form", type: "loadError", error: error.message })
  }
}

export async function loadBlankData(
  dispatch: Dispatch<Action>,
  _state: State,
  { contentType }: { contentType: ContentType }
) {
  dispatch({
    namespace: "form",
    type: "dataLoaded",
    data: { type: contentType.id, revisions: [], current: { data: {} } }
  })
}

export async function saveDraft(
  dispatch: Dispatch<Action>,
  _state: State,
  { loadedData, fieldValues }: Pick<FormState, "loadedData" | "fieldValues">
) {
  dispatch({ namespace: "form", type: "saveDraft" })

  try {
    const draft = loadedData.revisions.find(
      (revision: any) => !revision.liveFrom && !revision.liveUntil
    )

    let documentId = loadedData.id

    if (!documentId) {
      const result = await documentsService.create({
        type: loadedData.type,
        revisions: [{ data: fieldValues }]
      })

      documentId = result.id
    } else if (draft) {
      await revisionsService.patch(draft.id.$objectId, { data: fieldValues })
    } else {
      await revisionsService.create({
        documentId: loadedData.id,
        documentType: loadedData.type,
        documentCreatedAt: loadedData.createdAt,
        data: fieldValues
      })
    }

    const data = await documentsService.get(documentId.$objectId)

    dispatch({ namespace: "form", type: "draftSaved", data })
  } catch (error) {
    dispatch({ namespace: "form", type: "loadError", error: error.message })
  }
}
