export interface Config {
  contentTypes: ContentType[]
}

export interface ContentType {
  id: string
  name: string
  singularName: string
  listViews: ListView[]
  content: ContentAttribute[]
}

export type ListView = {
  type: "cards"
  titleFields?: string[]
  descriptionFields?: string[]
  captionFields?: string[]
}

export interface ContentAttribute {
  id: string
  name: string
  type: ContentAttributeType
}

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
  editor: Editor<StringEditor>
}

export type NumberAttributeType = {
  data: "number"
  field: NumberField
  editor: Editor<NumberEditor>
}

export type BooleanAttributeType = {
  data: "boolean"
  field: BooleanField
  editor: Editor<BooleanEditor>
}

export type ObjectAttributeType = {
  data: "object"
  field: ObjectField
  editor: Editor<ObjectEditor>
  content: ContentAttribute[]
}

export type StringArrayAttributeType = {
  data: "string[]"
  field: StringArrayField
  editor: Editor<StringArrayEditor>
}

export type ObjectArrayAttributeType = {
  data: "object[]"
  field: ObjectArrayField
  content: ContentAttribute[]
  editor: Editor<ObjectArrayEditor>
}

export type StringField = JsonField | { type: "text"; stripHtml?: boolean; truncate?: number }

export type NumberField = JsonField | { type: "number"; decimalPlaces?: number }

export type BooleanField =
  | JsonField
  | {
      type: "boolean"
      icons?: { true: string; false: string }
      text?: { true: string; false: string }
    }

export type ObjectField = JsonField

export type StringArrayField = JsonField | { type: "tags" }

export type ObjectArrayField = JsonField

export type JsonField = { type: "json" }

export type StringEditor =
  | TextEditor
  | TextAreaEditor
  | RichTextEditor
  | SelectEditor
  | RadioButtonsEditor

export interface TextEditor {
  type: "text"
  variant: "heading1" | "heading2" | "heading3" | "paragraph"
}

export interface TextAreaEditor {
  type: "textArea"
}

export interface RichTextEditor {
  type: "richText"
}

export interface SelectEditor {
  type: "select"
  options: Array<{ text: string; value: string }>
}

export interface RadioButtonsEditor {
  type: "radioButtons"
  options: Array<{ text: string; value: string }>
}

export type NumberEditor = { type: "number" }

export type BooleanEditor = { type: "checkbox" }

export type ObjectEditor = { type: "subform" }

export type StringArrayEditor = { type: "multiSelect" }

export type ObjectArrayEditor = { type: "list" }

export enum EditorWidth {
  FULL = 4,
  THREE_QUARTERS = 3,
  HALF = 2,
  QUARTER = 1
}

type Editor<T> = T & { width?: EditorWidth }
