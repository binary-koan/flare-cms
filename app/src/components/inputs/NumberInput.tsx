import React from "react"
import styled, { css } from "styled-components/macro"

const NumberInputField = styled.input`
  display: block;
  width: 100%;
  border: none;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  font: inherit;
  background: var(--input-background);
  border: 1px solid var(--input-border);
  color: var(--input-color);
  transition: all 0.2s;

  &:focus {
    background: var(--input-background-focus);
    border: 1px solid var(--input-border-focus);
    color: var(--input-color-focus);
  }
`

const NumberInput: React.FunctionComponent<{
  id: string
  value: number
  onChange: (value: number) => void
}> = ({ id, value, onChange, ...props }) => (
  <NumberInputField
    id={id}
    name={id}
    type="number"
    value={value}
    onChange={e => onChange(parseFloat(e.target.value))}
    {...props}
  />
)

export default NumberInput
