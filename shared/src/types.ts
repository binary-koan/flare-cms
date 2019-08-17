export interface Config {
  contentTypes: ContentType[]
}

export interface ContentType {
  id: string
  name: string
  formFields: FormField[]
}

export interface FormField {
  id: string
  name: string
  type: FieldType
}

export type FieldType =
  | StringFieldType
  | NumberFieldType
  | BooleanFieldType
  | ObjectFieldType
  | StringArrayFieldType
  | ObjectArrayFieldType

export type StringFieldType = {
  data: "string"
  editor: StringEditor
}

export type NumberFieldType = {
  data: "number"
  editor: NumberEditor
}

export type BooleanFieldType = {
  data: "boolean"
  editor: BooleanEditor
}

export type ObjectFieldType = {
  data: "object"
  editor: ObjectEditor
  fields: FormField[]
}

export type StringArrayFieldType = {
  data: "string[]"
  editor: StringArrayEditor
}

export type ObjectArrayFieldType = {
  data: "object[]"
  fields: FormField[]
  editor: ObjectArrayEditor
}

export type StringEditor =
  | TextEditorConfig
  | TextAreaEditorConfig
  | RichTextEditorConfig
  | SelectEditorConfig
  | RadioButtonsEditorConfig

export interface TextEditorConfig {
  type: "text"
  variant: "heading1" | "heading2" | "heading3" | "paragraph"
}

export interface TextAreaEditorConfig {
  type: "textArea"
}

export interface RichTextEditorConfig {
  type: "richText"
}

export interface SelectEditorConfig {
  type: "select"
}

export interface RadioButtonsEditorConfig {
  type: "radioButtons"
}

export type NumberEditor = { type: "number" }

export type BooleanEditor = { type: "checkbox" }

export type ObjectEditor = { type: "fields" }

export type StringArrayEditor = { type: "multiSelect" }

export type ObjectArrayEditor = { type: "list" }
