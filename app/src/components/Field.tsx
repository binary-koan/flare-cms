import React from "react"
import styled from "styled-components/macro"
import { Field } from "@shared/types"

import TextField from "@src/components/fields/TextField"
import NumberField from "@src/components/fields/NumberField"
import BooleanField from "@src/components/fields/BooleanField"
import TagsField from "@src/components/fields/TagsField"
import JsonField from "@src/components/fields/JsonField"

const Wrapper = styled.span``

const fields: { [T in Field["type"]]?: React.FunctionComponent<any> } = {
  text: TextField,
  number: NumberField,
  boolean: BooleanField,
  tags: TagsField,
  json: JsonField
}

function FieldView({ name, value, field, ...props }: { name: string; value: any; field: Field }) {
  if (!value) return null

  let Component

  if ((Component = fields[field.type])) {
    return (
      <Wrapper title={name} {...props}>
        <Component value={value} {...field} />
      </Wrapper>
    )
  }

  return null
}

export default FieldView
