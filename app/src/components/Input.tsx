import React from "react"
import { Editor } from "@shared/types"

import TextInput from "@src/components/inputs/TextInput"
import RichTextInput from "@src/components/inputs/RichTextInput"
import useUniqueId from "@src/hooks/useUniqueId"
import TextAreaInput from "@src/components/inputs/TextAreaInput"
import SelectInput from "@src/components/inputs/SelectInput"
import NumberInput from "@src/components/inputs/NumberInput"
import CheckboxInput from "@src/components/inputs/CheckboxInput"
import RadioButtonsInput from "@src/components/inputs/RadioButtonsInput"
import Labelled from "./Labelled"

const inputs: { [T in Editor["type"]]?: React.FunctionComponent<any> } = {
  text: TextInput,
  richText: RichTextInput,
  textArea: TextAreaInput,
  select: SelectInput,
  radioButtons: RadioButtonsInput,
  number: NumberInput,
  checkbox: CheckboxInput
}

const Input: React.FunctionComponent<{
  name: string
  value: any
  onChange: (value: any) => void
  editor: Editor
}> = ({ name, value, onChange, editor, ...props }) => {
  const id = useUniqueId("input")

  let Component

  if ((Component = inputs[editor.type])) {
    return (
      <Labelled label={name}>
        <Component id={id} value={value} onChange={onChange} {...editor} {...props} />
      </Labelled>
    )
  }

  return null
}

export default Input
