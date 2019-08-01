import Revision from "../../models/Revision"
import fetchRevisions from "./fetchRevisions"

export default async function deleteRevision(id: string) {
  await Revision.updateOne({ _id: id }, { $set: { deletedAt: new Date() } })

  return (await fetchRevisions({ filters: { $id: id } }))[0]
}
