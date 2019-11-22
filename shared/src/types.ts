import { ContentAttributeType } from "./types/attribute"
import {
  StringEditor,
  NumberEditor,
  BooleanEditor,
  ObjectEditor,
  StringArrayEditor,
  ObjectArrayEditor
} from "./types/editor"

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
  listViews: ListView[]
  attributes: ContentAttribute[]
}

export type ListView = {
  type: "cards"
  titleAttributes?: string[]
  descriptionAttributes?: string[]
  captionAttributes?: string[]
  filters?: Filter[]
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

export interface ContentAttribute {
  id: string
  name: string
  type: ContentAttributeType
}
