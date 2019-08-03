import { mapKeys, isEmpty } from "lodash"
import Revision, { currentlyLiveExpression } from "../../models/Revision"
import { buildOffsetQuery } from "../../utils/pagination"
import { RevisionData } from "./formatRevision"

const specialMappings: { [key: string]: string } = {
  $id: "_id",
  $createdAt: "createdAt",
  $updatedAt: "updatedAt",
  $liveFrom: "liveFrom",
  $liveUntil: "liveUntil",
  $deletedAt: "deletedAt",
  $documentCreatedAt: "documentCreatedAt"
}

const mapToData = (conditions: { [key: string]: any }) =>
  mapKeys(conditions, (_, key) => specialMappings[key] || `data.${key}`)

export default function fetchRevisions({
  filters = {},
  sort = { $createdAt: -1 },
  offset,
  limit
}: {
  filters?: { $id?: any; $createdAt?: any; [field: string]: any }
  sort?: { [field: string]: number }
  offset?: string
  limit?: number
}): Promise<RevisionData[]> {
  let query = Revision.find({
    $and: [mapToData(buildOffsetQuery(offset, sort)), mapToData(filters)]
  })

  if (!isEmpty(sort)) {
    query = query.sort(mapToData(sort))
  }

  if (limit != null) {
    query = query.limit(limit)
  }

  return query.exec()
}
