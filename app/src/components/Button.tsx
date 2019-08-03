import React from "react"
import styled from "styled-components/macro"
import Icon, { IconProps } from "./Icon"

const BaseButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  font: inherit;
  color: ${({ theme }) => theme.color.highlightColor};
  cursor: pointer;
`

const ButtonIcon = styled(Icon)`
  margin-right: 0.25rem;
  font-size: 1.25rem;
`

const BaseButton: React.FunctionComponent<{ icon?: string; iconType?: IconProps["type"] }> = ({
  icon,
  iconType,
  children,
  ...props
}) => (
  <BaseButtonWrapper {...props}>
    {icon && <ButtonIcon name={icon} type={iconType} />}
    {children}
  </BaseButtonWrapper>
)

const PrimaryButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.color.primary};
`

export { PrimaryButton }
