import feathers from "@feathersjs/feathers"
import { mapKeys } from "lodash"
import Revision, { currentlyLiveQuery } from "../models/Revision"
import { buildOffsetQuery } from "../utils/pagination"

interface RevisionData {
  id: String
  liveFrom?: Date
  liveUntil?: Date
  data: any
}

interface DocumentData {
  id: String
  revisions: RevisionData[]
}

const DEFAULT_LIMIT = 10

const content: Partial<feathers.Service<DocumentData>> = {
  async find(params = {}) {
    params.query = params.query || {}

    const { $sort = {}, $offset = undefined, $limit = DEFAULT_LIMIT, ...filters } = params.query

    const specialMappings: { [key: string]: string } = {
      $type: "documentType",
      $createdAt: "documentCreatedAt"
    }
    const mapToData = (conditions: { [key: string]: any }) =>
      mapKeys(conditions, (_, key) => specialMappings[key] || `data.${key}`)

    const data = await Revision.aggregate()
      .match({
        $and: [
          currentlyLiveQuery(),
          mapToData(buildOffsetQuery($offset, $sort)),
          mapToData(filters)
        ]
      })
      .sort(mapToData($sort))
      .limit($limit)
      .exec()

    return data.map((revisionData: any) => revisionData.data)
  }
}

export default content
