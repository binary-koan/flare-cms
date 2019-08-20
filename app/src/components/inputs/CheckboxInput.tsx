import React from "react"
import styled from "styled-components/macro"

const Checkbox = styled.input``

const CheckboxInput: React.FunctionComponent<{
  id: string
  value: boolean
  onChange: (value: boolean) => void
}> = ({ id, value, onChange, ...props }) => (
  <Checkbox id={id} name={id} type="checkbox" checked={value} onClick={() => onChange(!value)} />
)

export default CheckboxInput
