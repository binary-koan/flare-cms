import { Types } from "mongoose"
import { sortBy } from "lodash"
import { END_OF_TIME } from "../../constants"
import formatRevision, { RevisionData, FormattedRevision } from "../revisions/formatRevision"
import { formatJson, JsonDate, ConstrainedJsonResult } from "../../utils/jsonValues"

export interface DocumentData {
  _id: Types.ObjectId
  current: RevisionData
  revisions: RevisionData[]
}

export interface FormattedDocument {
  id: string
  type: string
  createdAt: JsonDate
  current: ConstrainedJsonResult<FormattedRevision>
  revisions: ConstrainedJsonResult<FormattedRevision[]>
}

export default function formatDocument(documentData: DocumentData): FormattedDocument {
  const sortedRevisions = sortBy(
    documentData.revisions,
    revision => revision.liveFrom || END_OF_TIME
  )

  return formatJson<FormattedDocument>({
    id: documentData._id,
    type: documentData.current.documentType,
    createdAt: documentData.current.documentCreatedAt,
    current: formatRevision(documentData.current),
    revisions: sortedRevisions.map(formatRevision)
  })
}
