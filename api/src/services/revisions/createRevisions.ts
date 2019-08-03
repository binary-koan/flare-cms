import Revision from "../../models/Revision"
import { FormattedRevision } from "./formatRevision"
import fetchRevisions from "./fetchRevisions"

export default async function createRevisions(data: Partial<FormattedRevision>[]) {
  const saved = await Promise.all(
    data.map(revision =>
      Revision.create({
        documentId: revision.documentId,
        documentType: revision.documentType,
        documentCreatedAt: revision.documentCreatedAt,
        liveFrom: revision.liveFrom,
        liveUntil: revision.liveUntil,
        data: revision.data
      })
    )
  )

  return fetchRevisions({ filters: { $id: saved.map(revision => revision.id) } })
}
