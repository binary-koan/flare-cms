import { map, fromPairs, isEmpty } from "lodash"
import Revision, { currentlyLiveExpression } from "../../models/Revision"
import { buildOffsetQuery } from "../../utils/pagination"
import { DocumentData } from "./formatDocument"
import buildQuery from "../../utils/buildQuery"

const specialMappings: { [key: string]: (value: any) => [string, any] } = {
  $id: id => ["_id", { $objectId: id }],
  $type: type => ["current.documentType", type],
  $createdAt: createdAt => ["current.documentCreatedAt", createdAt]
}

const mapToCurrent = (conditions: { [key: string]: any }) =>
  buildQuery(
    fromPairs(
      map(conditions, (value, key) =>
        specialMappings[key] ? specialMappings[key](value) : [`current.data.${key}`, value]
      )
    )
  )

export default function fetchDocuments({
  filters = {},
  sort = { $createdAt: -1 },
  offset,
  limit
}: {
  filters?: { $id?: any; $createdAt?: any; [field: string]: any }
  sort?: { [field: string]: number }
  offset?: string
  limit?: number
}): Promise<DocumentData[]> {
  let query = Revision.aggregate()
    .group({ _id: "$documentId", revisions: { $push: "$$ROOT" } })
    .project({
      revisions: 1,
      current: {
        $ifNull: [currentlyLiveExpression("$revisions"), { $arrayElemAt: ["$revisions", 0] }]
      }
    })
    .match({
      $and: [mapToCurrent(buildOffsetQuery(offset, sort)), mapToCurrent(filters)]
    })

  if (!isEmpty(sort)) {
    query = query.sort(mapToCurrent(sort))
  }

  if (limit != null) {
    query = query.limit(limit)
  }

  return query.exec()
}
