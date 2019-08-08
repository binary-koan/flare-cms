import feathers from "@feathersjs/feathers"
import { pick } from "lodash"
import Revision, { currentlyLiveQuery } from "../models/Revision"
import { buildOffsetQuery } from "../utils/pagination"
import { JsonDate, formatJson } from "../utils/jsonValues"
import buildQuery, { findValidFilters } from "../utils/buildQuery"

interface ContentData {
  documentId: string
  documentType: string
  documentCreatedAt: JsonDate
  data: { [key: string]: any }
}

const DEFAULT_LIMIT = 10

const whitelist = ["documentId", "documentType", "documentCreatedAt"]

const content: Partial<feathers.Service<ContentData>> = {
  async find(params = {}) {
    params.query = params.query || {}

    const { $sort = {}, $offset = undefined, $limit = DEFAULT_LIMIT, ...filters } = params.query

    const data = await Revision.aggregate()
      .match({
        $and: [
          currentlyLiveQuery(),
          buildOffsetQuery($offset, $sort, whitelist),
          buildQuery(filters, whitelist)
        ]
      })
      .sort(findValidFilters($sort, whitelist))
      .limit($limit)
      .exec()

    return data.map((revisionData: any) =>
      formatJson(pick(revisionData, ["documentId", "documentType", "documentCreatedAt", "data"]))
    )
  }
}

export default content
