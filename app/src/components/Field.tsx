import React from "react"
import styled from "styled-components/macro"
import { ContentAttributeType } from "@shared/types"

import TextField from "@src/components/fields/TextField"
import NumberField from "@src/components/fields/NumberField"
import BooleanField from "@src/components/fields/BooleanField"
import TagsField from "@src/components/fields/TagsField"
import JsonField from "@src/components/fields/JsonField"

const Wrapper = styled.span``

const fields: { [T in ContentAttributeType["field"]["type"]]?: React.FunctionComponent<any> } = {
  text: TextField,
  number: NumberField,
  boolean: BooleanField,
  tags: TagsField,
  json: JsonField
}

function Field({
  name,
  value,
  attributeType,
  ...props
}: {
  name: string
  value: any
  attributeType: ContentAttributeType
}) {
  if (!value) return null

  let Component

  if ((Component = fields[attributeType.field.type])) {
    return (
      <Wrapper title={name} {...props}>
        <Component value={value} attributeType={attributeType} {...attributeType.editor} />
      </Wrapper>
    )
  }

  return null
}

export default Field
