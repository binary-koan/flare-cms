import { Types } from "mongoose"

export interface RevisionData {
  _id: Types.ObjectId
  documentId: Types.ObjectId
  documentType: String
  documentCreatedAt: Date
  liveFrom?: Date
  liveUntil?: Date
  deletedAt?: Date
  data: any
}

export interface FormattedRevision {
  id: String
  documentId: String
  documentType: String
  documentCreatedAt: Date
  liveFrom?: Date
  liveUntil?: Date
  deletedAt?: Date
  data: any
}

export default function formatRevision(revisionData: RevisionData): FormattedRevision {
  return {
    id: revisionData._id.toHexString(),
    documentId: revisionData.documentId.toHexString(),
    documentType: revisionData.documentType,
    documentCreatedAt: revisionData.documentCreatedAt,
    liveFrom: revisionData.liveFrom,
    liveUntil: revisionData.liveUntil,
    deletedAt: revisionData.deletedAt,
    data: revisionData.data
  }
}
