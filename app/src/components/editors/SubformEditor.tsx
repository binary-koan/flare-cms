import React from "react"
import styled from "styled-components/macro"
import { ObjectAttributeType } from "@shared/types"
import Editor from "@src/components/Editor"

const Panel = styled.div`
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  background: var(--secondary-background);
`

const SubformEditor: React.FunctionComponent<{
  path: string[]
  attributeType: ObjectAttributeType
}> = ({ path, attributeType, ...props }) => (
  <Panel {...props}>
    {attributeType.content.map(item => (
      <Editor path={[...path, item.id]} name={item.name} attributeType={item.type} />
    ))}
  </Panel>
)

export default SubformEditor
