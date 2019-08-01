import Revision from "../../models/Revision"
import fetchDocuments from "./fetchDocuments"

export default async function deleteDocument(id: string) {
  const data = await fetchDocuments({ filters: { $id: id } })

  await Revision.updateMany({ documentId: id }, { $set: { deletedAt: new Date() } })

  return data[0]
}
