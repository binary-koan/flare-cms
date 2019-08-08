import { Types } from "mongoose"
import { JsonDate, JsonValue, formatJson } from "../../utils/jsonValues"

export interface RevisionData {
  _id: Types.ObjectId
  documentId: Types.ObjectId
  documentType: string
  documentCreatedAt: Date
  liveFrom?: Date
  liveUntil?: Date
  deletedAt?: Date
  data: any
}

export interface FormattedRevision {
  id: string
  documentId: string
  documentType: string
  documentCreatedAt: JsonDate
  liveFrom: JsonDate | null
  liveUntil: JsonDate | null
  deletedAt: JsonDate | null
  data: JsonValue
}

export default function formatRevision(revisionData: RevisionData) {
  return formatJson<FormattedRevision>({
    id: revisionData._id,
    documentId: revisionData.documentId,
    documentType: revisionData.documentType,
    documentCreatedAt: revisionData.documentCreatedAt,
    liveFrom: revisionData.liveFrom,
    liveUntil: revisionData.liveUntil,
    deletedAt: revisionData.deletedAt,
    data: revisionData.data
  })
}
