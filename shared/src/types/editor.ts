interface BaseEditor {
  width?: EditorWidth
}

export type StringEditor =
  | TextEditor
  | TextAreaEditor
  | RichTextEditor
  | SelectEditor
  | RadioButtonsEditor

export interface TextEditor extends BaseEditor {
  type: "text"
  variant: "heading1" | "heading2" | "heading3" | "paragraph"
}

export interface TextAreaEditor extends BaseEditor {
  type: "textArea"
}

export interface RichTextEditor extends BaseEditor {
  type: "richText"
}

export interface SelectEditor extends BaseEditor {
  type: "select"
  options: Array<{ text: string; value: string }>
}

export interface RadioButtonsEditor extends BaseEditor {
  type: "radioButtons"
  options: Array<{ text: string; value: string }>
}

export interface NumberEditor extends BaseEditor {
  type: "number"
}

export interface BooleanEditor extends BaseEditor {
  type: "checkbox"
}

export interface ObjectEditor extends BaseEditor {
  type: "subform"
}

export interface StringArrayEditor extends BaseEditor {
  type: "multiSelect"
}

export interface ObjectArrayEditor extends BaseEditor {
  type: "list"
}

export enum EditorWidth {
  FULL = 4,
  THREE_QUARTERS = 3,
  HALF = 2,
  QUARTER = 1
}

export type Editor =
  | StringEditor
  | NumberEditor
  | BooleanEditor
  | ObjectEditor
  | StringArrayEditor
  | ObjectArrayEditor
