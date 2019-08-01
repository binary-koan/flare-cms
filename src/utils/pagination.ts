import { Buffer } from "buffer"
import { mapValues } from "lodash"
import bson from "bson"

export const buildOffsetQuery = (offset: string | undefined, sort: { [key: string]: number }) => {
  if (!offset) return {}

  const data = bson.deserialize(new Buffer(offset, "base64"))

  return mapValues(sort, (order, field) => {
    if (!data[field]) return

    if (order > 0) {
      return { $gte: data[field] }
    } else {
      return { $lte: data[field] }
    }
  })
}
