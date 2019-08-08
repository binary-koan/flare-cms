import { Buffer } from "buffer"
import { mapValues } from "lodash"
import bson from "bson"
import { findValidFilters } from "./buildQuery"

export const buildOffsetQuery = (
  offset: string | undefined,
  sort: { [key: string]: number },
  whitelist: string[] = []
) => {
  if (!offset) return {}

  const data = bson.deserialize(new Buffer(offset, "base64"))
  const validSort = findValidFilters(sort, whitelist)

  return mapValues(validSort, (order, field) => {
    if (!data[field]) return

    if (order > 0) {
      return { $gte: data[field] }
    } else {
      return { $lte: data[field] }
    }
  })
}
