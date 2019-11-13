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
