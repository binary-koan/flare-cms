import { Schema, model, Document, Types } from "mongoose"

export interface IRevision extends Document {
  documentId: Types.ObjectId
  documentType: String
  documentCreatedAt: Date
  liveFrom?: Date
  liveUntil?: Date
  deletedAt?: Date
  data: any
}

const revisionsSchema = new Schema(
  {
    documentId: { type: Schema.Types.ObjectId, required: true },
    documentType: { type: String, required: true },
    documentCreatedAt: { type: Date, required: true },
    liveFrom: { type: Date },
    liveUntil: { type: Date },
    deletedAt: { type: Date },
    data: { type: Schema.Types.Mixed, required: true }
  },
  { timestamps: true }
)

export function currentlyLiveQuery() {
  return { liveFrom: { $lte: new Date() }, liveUntil: { $gte: new Date() }, deletedAt: null }
}

export function currentlyLiveExpression(inputFieldName: string) {
  return {
    $arrayElemAt: [
      {
        $filter: {
          input: inputFieldName,
          as: "revision",
          cond: {
            $and: [
              { $lte: ["$$revision.liveFrom", new Date()] },
              { $gte: ["$$revision.liveUntil", new Date()] },
              { $eq: ["$$revision.deletedAt", null] }
            ]
          }
        }
      },
      0
    ]
  }
}

const Revision = model<IRevision>("Revision", revisionsSchema)
export default Revision
