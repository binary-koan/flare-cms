import { mapKeys } from "lodash"
import Revision from "../../models/Revision"
import fetchRevisions from "./fetchRevisions"
import { FormattedRevision } from "./formatRevision"

const specialMappings: { [key: string]: string } = {
  $createdAt: "createdAt",
  $updatedAt: "updatedAt"
}

const mapToData = (conditions: { [key: string]: any }) =>
  mapKeys(conditions, (_, key) => specialMappings[key] || `data.${key}`)

export default async function updateRevision(id: string, changes: Partial<FormattedRevision>) {
  await Revision.updateOne({ _id: id }, { $set: mapToData(changes) })

  return (await fetchRevisions({ filters: { $id: id } }))[0]
}
