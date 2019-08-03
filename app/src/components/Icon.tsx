import React from "react"
import styled from "styled-components/macro"
import iconsSvg from "remixicon/fonts/remixicon.symbol.svg"

export interface IconProps {
  name: string
  type?: "fill" | "line"
}

const IconWrapper = styled.svg`
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: currentColor;
`

const Icon: React.FunctionComponent<IconProps> = ({ name, type, ...props }) => (
  <IconWrapper {...props}>
    <use href={`${iconsSvg}#remixicon-${name}-${type || "fill"}`} />
  </IconWrapper>
)

export default Icon
