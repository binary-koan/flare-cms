import feathers from "@feathersjs/feathers"
import restClient from "@feathersjs/rest-client"

const client = feathers()

client.configure(restClient("http://localhost:3000").fetch(window.fetch))

export const documentsService = client.service("documents")
export const revisionsService = client.service("revisions")
