import React from "react"
import styled from "styled-components/macro"

const Wrapper = styled.div``

const Label = styled.label``

const RadioButton = styled.input``

const RadioButtonsInput: React.FunctionComponent<{
  options: Array<{ text: string; value: string }>
  id: string
  value: string
  onChange: (value: string) => void
}> = ({ options, id, value, onChange, ...props }) => (
  <Wrapper {...props}>
    {options.map(option => (
      <Label key={option.value}>
        <RadioButton
          id={`${id}-${option.value}`}
          name={`${id}-${option.value}`}
          type="radio"
          value={option.value}
          checked={option.value === value}
          onClick={() => onChange(option.value)}
        />
        {option.text}
      </Label>
    ))}
  </Wrapper>
)

export default RadioButtonsInput
