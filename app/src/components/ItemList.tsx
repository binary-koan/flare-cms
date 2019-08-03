import styled from "styled-components/macro"
import React, { ReactNode } from "react"
import { Link } from "react-router-dom"
import Icon from "./Icon"

const ItemList = styled.ul`
  padding: 0;
`

const ItemWrapper = styled.li`
  list-style: none;
  display: flex;
`

const ItemEditWrapper = styled(Link)`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: "title icon" "description icon" "caption icon";
  align-items: center;
  padding: 1.5rem;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  background-color: ${({ theme }) => theme.color.secondaryBackground};
  color: ${({ theme }) => theme.color.bodyColor};
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.color.secondaryBackgroundStrong};
  }
`

const ItemTitle = styled.h3`
  font-size: 1.25rem;
  line-height: 1;
  margin: 0 0 0.5rem 0;
`

const ItemDescription = styled.div`
  margin: 0 0 0.75rem 0;
`

const ItemCaption = styled.div`
  margin: 0;
`

const EditIcon = styled(Icon)`
  grid-area: icon;
  font-size: 1.25rem;
`

const ItemOptionsWrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border: none;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  background-color: ${({ theme }) => theme.color.secondaryBackground};
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.color.secondaryBackgroundStrong};
  }
`

const OptionsIcon = styled(Icon)`
  font-size: 1.25rem;
`

const Item = ({
  title,
  description,
  caption
}: {
  title: ReactNode
  description: ReactNode
  caption: ReactNode
}) => (
  <ItemWrapper>
    <ItemEditWrapper to="#">
      <ItemTitle>{title}</ItemTitle>
      <ItemDescription>{description}</ItemDescription>
      <ItemCaption>{caption}</ItemCaption>

      <EditIcon name="pencil" />
    </ItemEditWrapper>

    <ItemOptionsWrapper>
      <OptionsIcon name="more" />
    </ItemOptionsWrapper>
  </ItemWrapper>
)

export { Item }
export default ItemList
