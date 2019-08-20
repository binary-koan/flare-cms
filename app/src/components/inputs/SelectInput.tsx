import React from "react"
import styled from "styled-components/macro"

const Select = styled.select`
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

const SelectInput: React.FunctionComponent<{
  options: Array<{ text: string; value: string }>
  id: string
  value: string
  onChange: (value: string) => void
}> = ({ options, id, value, onChange, ...props }) => (
  <Select id={id} name={id} value={value} onChange={e => onChange(e.target.value)} {...props}>
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.text}
      </option>
    ))}
  </Select>
)

export default SelectInput
