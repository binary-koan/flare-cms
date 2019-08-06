import React from "react"
import styled from "styled-components"
import format from "date-fns/format"
import Icon from "../Icon"

const DateWrapper = styled.span`
  display: inline-flex;
  align-items: center;
`

const DateIcon = styled(Icon)`
  margin-right: 0.25rem;
`

const DateField: React.FunctionComponent<{ date?: Date }> = ({ date }) => (
  <DateWrapper>
    <DateIcon name="calendar" type="line" />
    {date ? format(date, "yyyy-MM-dd hh:mm") : "-"}
  </DateWrapper>
)

export default DateField
