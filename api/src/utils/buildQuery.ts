import { mapValues, pickBy } from "lodash"
import { ObjectId } from "bson"

type FilterInput =
  | string
  | { [key: string]: string }
  | { [key: string]: FilterInput }
  | { [key: string]: FilterInput[] }

type Query = { [key: string]: any }

const TYPE_BUILDERS: { [key: string]: (value?: string) => any } = {
  $null: () => null,
  $date: (value?: string) => value && new Date(value),
  $objectId: (value?: string) => value && ObjectId.createFromHexString(value)
}

function findTypeBuilder(keys: string[]) {
  return keys.find(key => Object.keys(TYPE_BUILDERS).includes(key))
}

function applyTypeBuilder(
  value: FilterInput | FilterInput[],
  typeBuilder: (value?: string) => any
): any {
  if (typeof value === "string") {
    return typeBuilder(value)
  } else if (Array.isArray(value)) {
    return value.map(child => applyTypeBuilder(child, typeBuilder))
  } else {
    return mapValues(value, child => applyTypeBuilder(child, typeBuilder))
  }
}

export default function buildQuery(filters: FilterInput, whitelist: string[] = []): Query {
  if (typeof filters === "string") {
    return {}
  }

  const validFilters = findValidFilters(filters, whitelist)

  return mapValues(validFilters, value => {
    if (!value) return

    if (typeof value === "string") {
      return value
    } else if (Array.isArray(value)) {
      return value.map(value => buildQuery(value, whitelist))
    }

    const typeBuilder = findTypeBuilder(Object.keys(value))
    if (typeBuilder) {
      return applyTypeBuilder(value[typeBuilder], TYPE_BUILDERS[typeBuilder])
    }

    return buildQuery(value, whitelist)
  })
}

export function findValidFilters(filters: { [key: string]: any }, whitelist: string[] = []) {
  return pickBy(filters, (_, key) => whitelist.includes(key) || /^data\.[a-zA-Z0-9\.]+$/.test(key))
}
