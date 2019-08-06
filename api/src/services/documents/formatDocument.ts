import { Types } from "mongoose"
import { sortBy } from "lodash"
import { END_OF_TIME } from "../../constants"
import formatRevision, { RevisionData, FormattedRevision } from "../revisions/formatRevision"

export interface DocumentData {
  _id: Types.ObjectId
  current: RevisionData
  revisions: RevisionData[]
}

export interface FormattedDocument {
  id: String
  type: String
  createdAt: Date
  current: FormattedRevision
  revisions: FormattedRevision[]
}

export default function formatDocument(documentData: DocumentData): FormattedDocument {
  const sortedRevisions = sortBy(
    documentData.revisions,
    revision => revision.liveFrom || END_OF_TIME
  )

  return {
    id: documentData._id.toString(),
    type: documentData.current.documentType,
    createdAt: documentData.current.documentCreatedAt,
    current: formatRevision(documentData.current),
    revisions: sortedRevisions.map(formatRevision)
  }
}
