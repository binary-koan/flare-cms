import { mapValues, pickBy, mapKeys } from "lodash"
import { ObjectId } from "bson"
import isPlainObject = require("lodash/isPlainObject")

type FilterInput =
  | string
  | { [key: string]: string }
  | { [key: string]: FilterInput }
  | { [key: string]: FilterInput[] }

type Query = { [key: string]: any }

const OPERATORS = [
  "$eq",
  "$ne",
  "$gt",
  "$gte",
  "$lt",
  "$lte",
  "$in",
  "$nin",
  "$regex",
  "$and",
  "$or"
]

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

export default function buildQuery(
  filters: FilterInput,
  whitelist: string[] = [],
  { prefix }: { prefix?: string } = {}
): Query {
  if (typeof filters === "string") {
    return {}
  }

  const validFilters = applyPrefix(findValidFilters(filters, whitelist), prefix)

  return mapValues(validFilters, value => buildPartialQuery(value, { whitelist, prefix }))
}

const buildPartialQuery = (
  value: any,
  { whitelist, prefix }: { whitelist: string[]; prefix?: string }
): any => {
  if (!value) return

  if (Array.isArray(value)) {
    return value.map(value => buildPartialQuery(value, { whitelist, prefix }))
  }

  if (!isPlainObject(value)) {
    return value
  }

  const typeBuilder = findTypeBuilder(Object.keys(value))
  if (typeBuilder) {
    return applyTypeBuilder(value[typeBuilder], TYPE_BUILDERS[typeBuilder])
  }

  return mapValues(applyPrefix(value, prefix), childValue =>
    buildPartialQuery(childValue, { whitelist, prefix })
  )
}

const applyPrefix = (object: { [key: string]: any }, prefix?: string) =>
  mapKeys(object, (_, key) => (prefix && !key.startsWith("$") ? `${prefix}.${key}` : key))

export function findValidFilters(filters: { [key: string]: any }, whitelist: string[] = []) {
  return pickBy(
    filters,
    (_, key) =>
      whitelist.includes(key) || OPERATORS.includes(key) || /^data\.[a-zA-Z0-9\.]+$/.test(key)
  )
}
