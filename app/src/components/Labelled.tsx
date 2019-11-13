import React from "react"
import styled from "styled-components/macro"

const Label = styled.label`
  display: block;
  margin-bottom: 0.375rem;
  font-weight: 500;
`

const Labelled: React.FunctionComponent<{
  label: string
}> = ({ label, children, ...props }) => {
  return (
    <>
      <Label {...props}>{label}</Label>
      {children}
    </>
  )
}

export default Labelled
