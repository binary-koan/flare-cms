import { isEmpty } from "lodash"
import Revision from "../../models/Revision"
import { buildOffsetQuery } from "../../utils/pagination"
import { RevisionData } from "./formatRevision"
import buildQuery, { findValidFilters } from "../../utils/buildQuery"

const whitelist = [
  "documentId",
  "documentType",
  "documentCreatedAt",
  "liveFrom",
  "liveUntil",
  "deletedAt"
]

export default function fetchRevisions({
  filters = {},
  sort = { documentCreatedAt: -1 },
  offset,
  limit
}: {
  filters?: { [field: string]: any }
  sort?: { [field: string]: number }
  offset?: string
  limit?: number
}): Promise<RevisionData[]> {
  let query = Revision.find({
    $and: [buildOffsetQuery(offset, sort, whitelist), buildQuery(filters, whitelist)]
  })

  if (!isEmpty(sort)) {
    query = query.sort(findValidFilters(sort, whitelist))
  }

  if (limit != null) {
    query = query.limit(limit)
  }

  return query.exec()
}
