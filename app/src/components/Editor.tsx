import React from "react"
import styled from "styled-components/macro"
import { ContentAttributeType, EditorWidth } from "@shared/types"

import TextInput from "@src/components/inputs/TextInput"
import RichTextInput from "@src/components/inputs/RichTextInput"
import useFormField from "@src/hooks/form/useFormField"
import useUniqueId from "@src/hooks/useUniqueId"
import TextAreaInput from "@src/components/inputs/TextAreaInput"
import SelectInput from "@src/components/inputs/SelectInput"
import NumberInput from "@src/components/inputs/NumberInput"
import CheckboxInput from "@src/components/inputs/CheckboxInput"
import RadioButtonsInput from "@src/components/inputs/RadioButtonsInput"

import SubformEditor from "@src/components/editors/SubformEditor"

const EditorWrapper = styled.div<{ width: EditorWidth }>`
  grid-column-end: span ${({ width }) => width};
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.375rem;
  font-weight: 500;
`

const inputs: { [T in ContentAttributeType["editor"]["type"]]?: React.FunctionComponent<any> } = {
  text: TextInput,
  richText: RichTextInput,
  textArea: TextAreaInput,
  select: SelectInput,
  radioButtons: RadioButtonsInput,
  number: NumberInput,
  checkbox: CheckboxInput
}

const editors: { [T in ContentAttributeType["editor"]["type"]]?: React.FunctionComponent<any> } = {
  subform: SubformEditor
}

function Editor({
  path,
  name,
  attributeType,
  ...props
}: {
  path: string[]
  name: string
  attributeType: ContentAttributeType
}) {
  const id = useUniqueId("editor")
  const { value, onChange } = useFormField(path)
  const width = attributeType.editor.width || EditorWidth.FULL

  let Component

  if ((Component = inputs[attributeType.editor.type])) {
    return (
      <EditorWrapper width={width} {...props}>
        <Label>{name}</Label>
        <Component
          id={id}
          value={value}
          onChange={onChange}
          attributeType={attributeType}
          {...attributeType.editor}
        />
      </EditorWrapper>
    )
  }

  if ((Component = editors[attributeType.editor.type])) {
    return (
      <EditorWrapper width={width} {...props}>
        <Label>{name}</Label>
        <Component path={path} attributeType={attributeType} {...attributeType.editor} />
      </EditorWrapper>
    )
  }

  return null
}

export default Editor
