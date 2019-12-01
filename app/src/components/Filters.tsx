import React, { useState, useEffect } from "react"
import { ListView, ContentType, Filter } from "@shared/types"
import styled from "styled-components/macro"
import { debounce, escapeRegExp } from "lodash"
import Input from "./Input"
import useOperation from "@src/hooks/useOperation"
import { filterData } from "@src/store/list/operations"
import { useSelector } from "react-redux"

const Wrapper = styled.div`
  max-width: 20rem;
  padding: 1rem 1.5rem;
`

const FilterInput: React.FunctionComponent<{
  index: number
  filter: Filter
}> = ({ index, filter }) => {
  const displayValue = useSelector(state => state.list.filters?.[index]?.displayValue)
  const runFilter = useOperation(filterData)
  const debouncedRun = debounce(runFilter, 500)

  const [currentValue, setCurrentValue] = useState(displayValue)

  useEffect(() => {
    setCurrentValue(displayValue)
  }, [displayValue])

  const onChange = (newValue: any) => {
    setCurrentValue(newValue)

    switch (filter.type) {
      case "equals":
        debouncedRun({
          filterIndex: index,
          filter: {
            name: filter.name,
            attributes: [filter.attribute],
            operator: "$eq",
            value: newValue,
            displayValue: newValue
          }
        })
        break
      case "contains":
        debouncedRun({
          filterIndex: index,
          filter: {
            name: filter.name,
            attributes: filter.attributes,
            operator: "$regex",
            value: escapeRegExp(newValue),
            displayValue: newValue
          }
        })
        break
    }
  }

  return (
    <Input name={filter.name} value={currentValue} onChange={onChange} editor={filter.editor} />
  )
}

const Filters: React.FunctionComponent<{ filters: Filter[] }> = ({ filters }) => {
  if (!filters) return null

  return (
    <Wrapper>
      {filters.map((filter, index) => (
        <FilterInput key={filter.name} index={index} filter={filter} />
      ))}
    </Wrapper>
  )
}

export default Filters
