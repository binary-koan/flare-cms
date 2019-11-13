import {
  StringField,
  NumberField,
  BooleanField,
  ObjectField,
  StringArrayField,
  ObjectArrayField
} from "./field"
import {
  Editor,
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
  field: StringField
  editor: StringEditor
}

export type NumberAttributeType = {
  data: "number"
  field: NumberField
  editor: NumberEditor
}

export type BooleanAttributeType = {
  data: "boolean"
  field: BooleanField
  editor: BooleanEditor
}

export type ObjectAttributeType = {
  data: "object"
  field: ObjectField
  editor: ObjectEditor
  attributes: ContentAttribute[]
}

export type StringArrayAttributeType = {
  data: "string[]"
  field: StringArrayField
  editor: StringArrayEditor
}

export type ObjectArrayAttributeType = {
  data: "object[]"
  field: ObjectArrayField
  attributes: ContentAttribute[]
  editor: ObjectArrayEditor
}
