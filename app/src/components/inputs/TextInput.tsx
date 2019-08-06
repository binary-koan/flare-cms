import React from "react"
import styled, { css } from "styled-components/macro"
import Input from "../Input"

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
  background: ${({ theme }) => theme.color.inputBackground};
  border: 1px solid ${({ theme }) => theme.color.inputBorder};
  color: ${({ theme }) => theme.color.inputColor};
  transition: all 0.2s;
  ${({ variant }) => variants[variant]};

  &:focus {
    background: ${({ theme }) => theme.color.inputBackgroundFocus};
    border: 1px solid ${({ theme }) => theme.color.inputBorderFocus};
    color: ${({ theme }) => theme.color.inputColorFocus};
  }
`

const TextInput: React.FunctionComponent<{
  variant: TextVariant
  label: string
  value: string
  onChange: (value: string) => void
}> = ({ variant, value, onChange, ...props }) => (
  <Input {...props}>
    {id => (
      <TextInputField
        id={id}
        name={id}
        variant={variant}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    )}
  </Input>
)

export default TextInput
