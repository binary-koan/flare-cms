import { isPlainObject, reduce, merge, pick } from "lodash"
import Revision from "../../models/Revision"
import fetchRevisions from "./fetchRevisions"
import { FormattedRevision } from "./formatRevision"
import { parseJson } from "../../utils/jsonValues"

const flattenKeys = (object: any, path: string[] = []): { [key: string]: any } => {
  if (isPlainObject(object) || Array.isArray(object)) {
    return reduce(
      object,
      (flattened, value, key) => merge(flattened, flattenKeys(value, [...path, key])),
      {}
    )
  } else {
    return { [path.join(".")]: object }
  }
}

export default async function updateRevision(id: string, changes: Partial<FormattedRevision>) {
  const flatChanges = flattenKeys(
    pick(parseJson(changes), [
      "documentId",
      "documentType",
      "documentCreatedAt",
      "liveFrom",
      "liveUntil",
      "data"
    ])
  )

  await Revision.updateOne({ _id: id }, { $set: flatChanges })

  return (await fetchRevisions({ filters: { $id: id } }))[0]
}
