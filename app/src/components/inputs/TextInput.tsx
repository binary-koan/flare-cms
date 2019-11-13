import React from "react"
import styled, { css } from "styled-components/macro"

const variants = {
  heading1: css`
    font-size: 1.953em;
    font-weight: bold;
  `,
  heading2: css`
    font-size: 1.563rem;
    font-weight: bold;
  `,
  heading3: css`
    font-size: 1.25rem;
    font-weight: bold;
  `,
  paragraph: css``
}

type TextVariant = keyof (typeof variants)

const TextInputField = styled.input<{ variant: TextVariant }>`
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
  ${({ variant }) => variants[variant]};

  &:focus {
    background: var(--input-background-focus);
    border: 1px solid var(--input-border-focus);
    color: var(--input-color-focus);
  }
`

const TextInput: React.FunctionComponent<{
  variant: TextVariant
  id: string
  value: string | null
  onChange: (value: string) => void
}> = ({ id, variant, value, onChange, ...props }) => (
  <TextInputField
    id={id}
    name={id}
    variant={variant}
    type="text"
    value={value || ""}
    onChange={e => onChange(e.target.value)}
    {...props}
  />
)

export default TextInput
