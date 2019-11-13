import isPlainObject from "lodash/isPlainObject"
import mapValues from "lodash/mapValues"
import { types } from "util"
import { ObjectId } from "bson"
import { Types } from "mongoose"

interface JsonObject {
  [key: string]: JsonValue
}

interface JsonArray extends Array<JsonValue> {}

export interface JsonObjectId {
  $objectId: string
}

export interface JsonDate {
  $date: string
}

export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonObjectId
  | JsonDate
  | JsonArray
  | JsonObject

export type ConstrainedJsonResult<T> = { [K in keyof T]: JsonValue }

export function formatJson<T extends JsonValue>(object: any): T
export function formatJson<T extends ConstrainedJsonResult<T>>(object: any): T
export function formatJson(object: any): JsonValue {
  if (object == null) {
    return null
  } else if (
    typeof object === "string" ||
    typeof object === "number" ||
    typeof object === "boolean"
  ) {
    return object
  } else if (Array.isArray(object)) {
    return object.map(formatJson)
  } else if (types.isDate(object)) {
    return { $date: object.toString() }
  } else if (object instanceof ObjectId || object instanceof Types.ObjectId) {
    return { $objectId: object.toHexString() }
  } else if (isPlainObject(object)) {
    return mapValues(object, formatJson)
  } else {
    throw new Error(`Cannot format value as JSON: ${object.toString()}`)
  }
}

export function parseJson<T extends JsonValue>(object: T): any
export function parseJson<T extends ConstrainedJsonResult<T>>(object: T): any
export function parseJson(object: JsonValue): any {
  if (object === null) {
    return null
  } else if (
    typeof object === "string" ||
    typeof object === "number" ||
    typeof object === "boolean"
  ) {
    return object
  } else if (Array.isArray(object)) {
    return object.map(parseJson)
  } else if ((object as any).$date) {
    return new Date((object as any).$date.toString())
  } else if ((object as any).$objectId) {
    return ObjectId.createFromHexString((object as any).$objectId)
  } else if (isPlainObject(object)) {
    return mapValues(object, parseJson)
  } else {
    throw new Error(`Cannot parse JSON value: ${object.toString()}`)
  }
}
