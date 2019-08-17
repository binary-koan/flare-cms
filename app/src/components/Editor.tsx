import React from "react"
import { FieldType } from "@shared/types"
import TextInput from "./inputs/TextInput"
import RichTextInput from "./inputs/RichTextInput"
import useFormField from "@src/hooks/form/useFormField"

const editors: { [T in FieldType["editor"]["type"]]?: React.FunctionComponent<any> } = {
  text: TextInput,
  richText: RichTextInput
}

function Editor<Input, Config>(props: {
  path: string[]
  name: string
  config: {
    type: FieldType["editor"]["type"]
    [key: string]: any
  }
}) {
  const { value, onChange } = useFormField(props.path)
  const InputComponent = editors[props.config.type]

  return InputComponent ? (
    <InputComponent value={value} onChange={onChange} label={props.name} {...props} />
  ) : null
}

export default Editor
