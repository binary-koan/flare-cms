import React, { Children } from "react"
import styled from "styled-components/macro"

const FieldRowWrapper = styled.div`
  display: flex;
  align-items: center;
`

const FieldRowItem = styled.div`
  &:not(:last-child) {
    margin-right: 0.75rem;
  }
`

const FieldRow: React.FunctionComponent = ({ children, ...props }) => (
  <FieldRowWrapper {...props}>
    {Children.map(children, child => (
      <FieldRowItem>{child}</FieldRowItem>
    ))}
  </FieldRowWrapper>
)

export default FieldRow
