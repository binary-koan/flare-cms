import React, { HTMLProps } from "react"
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
  font-size: 1.25rem;

  &:not(:last-child) {
    margin-right: 0.25rem;
  }
`

const BaseButton: React.FunctionComponent<
  any & {
    icon?: string
    iconType?: IconProps["type"]
  }
> = ({ icon, iconType, children, ...props }) => (
  <BaseButtonWrapper {...props}>
    {icon && <ButtonIcon name={icon} type={iconType} />}
    {React.Children.count(children) > 0 && <span>{children}</span>}
  </BaseButtonWrapper>
)

const PrimaryButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.color.primary};
`

const SecondaryButton = styled(BaseButton)`
  background-color: ${({ theme }) => theme.color.secondaryBackground};
  color: ${({ theme }) => theme.color.bodyColor};
`

export { PrimaryButton, SecondaryButton }

export const ButtonRow = styled.div`
  display: flex;

  & ${BaseButtonWrapper}:not(:last-child) {
    margin-right: 0.5rem;
  }
`
