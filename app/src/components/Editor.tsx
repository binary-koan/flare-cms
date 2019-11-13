import React from "react"
import styled from "styled-components/macro"
import { ContentAttributeType, EditorWidth } from "@shared/types"

import useFormField from "@src/hooks/form/useFormField"

import SubformEditor from "@src/components/editors/SubformEditor"
import Labelled from "./Labelled"
import Input from "./Input"

const Wrapper = styled.div<{ width: EditorWidth }>`
  grid-column-end: span ${({ width }) => width};
`

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
  const { value, onChange } = useFormField(path)
  const width = attributeType.editor.width || EditorWidth.FULL

  let Component

  if ((Component = editors[attributeType.editor.type])) {
    return (
      <Wrapper width={width} {...props}>
        <Labelled label={name}>
          <Component path={path} attributeType={attributeType} {...attributeType.editor} />
        </Labelled>
      </Wrapper>
    )
  }

  return (
    <Wrapper width={width} {...props}>
      <Input name={name} value={value} onChange={onChange} editor={attributeType.editor} />
    </Wrapper>
  )
}

export default Editor
