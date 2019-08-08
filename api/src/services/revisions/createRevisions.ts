import { pick } from "lodash"
import Revision from "../../models/Revision"
import { FormattedRevision } from "./formatRevision"
import fetchRevisions from "./fetchRevisions"
import { parseJson } from "../../utils/jsonValues"

export default async function createRevisions(data: Partial<FormattedRevision>[]) {
  const saved = await Promise.all(
    data.map(revision =>
      Revision.create(
        parseJson(
          pick(revision as any, [
            "documentId",
            "documentType",
            "documentCreatedAt",
            "liveFrom",
            "liveUntil",
            "data"
          ])
        )
      )
    )
  )

  return fetchRevisions({ filters: { $id: saved.map(revision => revision.id) } })
}
