import React from "react"
import styled from "styled-components/macro"

const TextArea = styled.textarea`
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

const TextAreaInput: React.FunctionComponent<{
  id: string
  value: string
  onChange: (value: string) => void
}> = ({ id, value, onChange, ...props }) => (
  <TextArea id={id} name={id} value={value} onChange={e => onChange(e.target.value)} {...props} />
)

export default TextAreaInput
