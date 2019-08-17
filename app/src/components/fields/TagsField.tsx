import React from "react"
import styled from "styled-components/macro"

const TagsWrapper = styled.ul`
  display: inline-block;
  padding: 0;
`

const Tag = styled.li`
  list-style: none;
  display: inline-block;
  padding: 0.15rem 0.35rem;
  background-color: var(--secondary);
  color: var(--highlight-color);
  border-radius: 0.15rem;

  &:not(:last-child) {
    margin-right: 0.35rem;
  }
`

const TagsField: React.FunctionComponent<{ items: string[] }> = ({ items }) => (
  <TagsWrapper>
    {items.map(item => (
      <Tag key={item}>{item}</Tag>
    ))}
  </TagsWrapper>
)

export default TagsField
