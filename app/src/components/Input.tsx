import { ReactNode } from "react"
import React from "react"
import styled from "styled-components/macro"
import useUniqueId from "../hooks/useUniqueId"

const InputWrapper = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.375rem;
  font-weight: 500;
`

const Input: React.FunctionComponent<{ label: ReactNode; children: (id: string) => ReactNode }> = ({
  label,
  children,
  ...props
}) => {
  const id = useUniqueId("input")

  return (
    <InputWrapper {...props}>
      <Label>{label}</Label>
      {children(id)}
    </InputWrapper>
  )
}

export default Input
