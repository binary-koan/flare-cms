import React from "react"
import styled from "styled-components/macro"

import config from "@shared/content"
import { NavLink } from "react-router-dom"

const Wrapper = styled.div`
  min-width: 10rem;
`

const Link = styled(NavLink)`
  display: block;
  padding: 1rem;
`

const Sidebar: React.FC = props => {
  return (
    <Wrapper {...props}>
      {config.contentTypes.map(contentType => (
        <Link key={contentType.id} to={`/content/${contentType.id}`}>
          {contentType.name}
        </Link>
      ))}
    </Wrapper>
  )
}

export default Sidebar
