import feathers from "@feathersjs/feathers"
import fetchDocuments from "./documents/fetchDocuments"
import formatDocument, { FormattedDocument } from "./documents/formatDocument"
import createDocuments from "./documents/createDocuments"
import deleteDocument from "./documents/deleteDocument"

const DEFAULT_LIMIT = 10

const documents: Partial<feathers.Service<FormattedDocument>> = {
  async find(params = {}) {
    params.query = params.query || {}

    const { $sort, $offset, $limit = DEFAULT_LIMIT, ...filters } = params.query

    const data = await fetchDocuments({
      filters,
      sort: $sort,
      offset: $offset,
      limit: $limit
    })

    return data.map(formatDocument)
  },

  async get(id) {
    const data = await fetchDocuments({ filters: { $id: id } })

    return data[0] && formatDocument(data[0])
  },

  async create(data: any): Promise<any> {
    if (Array.isArray(data)) {
      return (await createDocuments(data)).map(formatDocument)
    } else {
      return formatDocument((await createDocuments([data]))[0])
    }
  },

  async remove(id) {
    return formatDocument(await deleteDocument((id || "").toString()))
  }
}

export default documents
