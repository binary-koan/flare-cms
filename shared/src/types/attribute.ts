import {
  StringEditor,
  NumberEditor,
  BooleanEditor,
  ObjectEditor,
  StringArrayEditor,
  ObjectArrayEditor
} from "./editor"
import { ContentAttribute } from "../types"

export type ContentAttributeType =
  | StringAttributeType
  | NumberAttributeType
  | BooleanAttributeType
  | ObjectAttributeType
  | StringArrayAttributeType
  | ObjectArrayAttributeType

export type StringAttributeType = {
  data: "string"
  editor: StringEditor
}

export type NumberAttributeType = {
  data: "number"
  editor: NumberEditor
}

export type BooleanAttributeType = {
  data: "boolean"
  editor: BooleanEditor
}

export type ObjectAttributeType = {
  data: "object"
  editor: ObjectEditor
  attributes: ContentAttribute[]
}

export type StringArrayAttributeType = {
  data: "string[]"
  editor: StringArrayEditor
}

export type ObjectArrayAttributeType = {
  data: "object[]"
  editableAttributes: ContentAttribute[]
  editor: ObjectArrayEditor
}
