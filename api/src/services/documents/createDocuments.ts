import { ObjectId } from "bson"
import { FormattedDocument } from "./formatDocument"
import fetchDocuments from "./fetchDocuments"
import createRevisions from "../revisions/createRevisions"

export default async function createDocuments(
  data: Pick<FormattedDocument, "type" | "revisions">[]
) {
  const documentIds = await Promise.all(
    data.map(async documentData => {
      if (!documentData.revisions) return

      const documentId = new ObjectId()
      const documentCreatedAt = new Date()

      await createRevisions(
        documentData.revisions.map(revision => ({
          ...(revision as any),
          documentId: { $objectId: documentId.toHexString() },
          documentType: documentData.type,
          documentCreatedAt: { $date: documentCreatedAt.toString() }
        }))
      )

      return documentId
    })
  )

  return fetchDocuments({ filters: { $id: { $in: documentIds } } })
}
