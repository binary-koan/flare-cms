import { ContentAttributeType } from "./types/attribute"
import {
  StringEditor,
  NumberEditor,
  BooleanEditor,
  ObjectEditor,
  StringArrayEditor,
  ObjectArrayEditor
} from "./types/editor"
import { Field } from "./types/field"

export * from "./types/attribute"
export * from "./types/editor"
export * from "./types/field"

export interface Config {
  contentTypes: ContentType[]
}

export interface ContentType {
  id: string
  name: string
  singularName: string
  editableAttributes: ContentAttribute[]
  listViews: ListView[]
  filters?: Filter[]
}

export type ListView = {
  type: "cards"
  titleFields?: Field[]
  descriptionFields?: Field[]
  captionFields?: Field[]
}

export type Filter =
  | {
      type: "equals"
      name: string
      default?: string
      attribute: string
      editor:
        | StringEditor
        | NumberEditor
        | BooleanEditor
        | ObjectEditor
        | StringArrayEditor
        | ObjectArrayEditor
    }
  | { type: "contains"; name: string; default?: string; attributes: string[]; editor: StringEditor }

export type ContentAttribute = ContentAttributeType & {
  id: string
  name: string
}
