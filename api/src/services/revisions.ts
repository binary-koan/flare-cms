import feathers from "@feathersjs/feathers"
import formatRevision, { FormattedRevision } from "./revisions/formatRevision"
import fetchRevisions from "./revisions/fetchRevisions"
import createRevisions from "./revisions/createRevisions"
import deleteRevision from "./revisions/deleteRevision"
import updateRevision from "./revisions/updateRevision"

const DEFAULT_LIMIT = 10

const revisions: Partial<feathers.Service<FormattedRevision>> = {
  async find(params = {}) {
    params.query = params.query || {}

    const { $sort, $offset, $limit = DEFAULT_LIMIT, ...filters } = params.query

    const data = await fetchRevisions({
      filters,
      sort: $sort,
      offset: $offset,
      limit: $limit
    })

    return data.map(formatRevision)
  },

  async get(id, params) {
    const data = await fetchRevisions({
      filters: { $documentId: params && params.route.documentId, $id: id }
    })

    return data[0] && formatRevision(data[0])
  },

  async create(data: any): Promise<any> {
    if (Array.isArray(data)) {
      return (await createRevisions(data)).map(formatRevision)
    } else {
      return formatRevision((await createRevisions([data]))[0])
    }
  },

  async patch(id: feathers.NullableId, data: Partial<FormattedRevision>) {
    return formatRevision(await updateRevision((id || "").toString(), data))
  },

  async remove(id) {
    return formatRevision(await deleteRevision((id || "").toString()))
  }
}

export default revisions
