export type StringField = { type: "text"; stripHtml?: boolean; truncate?: number }

export type NumberField = { type: "number"; decimalPlaces?: number }

export type BooleanField = {
  type: "boolean"
  icons?: { true: string; false: string }
  text?: { true: string; false: string }
}

export type ObjectField = JsonField

export type StringArrayField = { type: "tags" }

export type ObjectArrayField = JsonField

export type JsonField = { type: "json" }

export type Field = { attribute: string } & (
  | StringField
  | NumberField
  | BooleanField
  | ObjectField
  | StringArrayField
  | ObjectArrayField
  | JsonField
)
