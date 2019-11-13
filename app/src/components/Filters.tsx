import React, { useState } from "react"
import { ListView, ContentType, Filter } from "@shared/types"
import styled from "styled-components/macro"
import { debounce, escapeRegExp } from "lodash"
import Input from "./Input"
import useOperation from "@src/hooks/useOperation"
import { filterData } from "@src/store/list/operations"

const Wrapper = styled.div`
  max-width: 16rem;
`

const FilterInput: React.FunctionComponent<{ filter: Filter }> = ({ filter }) => {
  const [value, setValue] = useState(null)
  const runFilter = useOperation(filterData)
  const debouncedRun = debounce(runFilter, 500)

  const onChange = (newValue: any) => {
    setValue(newValue)

    switch (filter.type) {
      case "equals":
        debouncedRun({
          filters: [
            { name: filter.name, attribute: filter.attribute, operator: "$eq", value: newValue }
          ]
        })
        break
      case "contains":
        debouncedRun({
          filters: filter.attributes.map(attribute => ({
            name: filter.name,
            attribute: attribute,
            operator: "$regex",
            value: escapeRegExp(newValue)
          }))
        })
        break
    }
  }

  return <Input name={filter.name} value={value} onChange={onChange} editor={filter.editor} />
}

const Filters: React.FunctionComponent<{ listView: ListView }> = ({ listView }) => {
  if (!listView.filters) return null

  return (
    <Wrapper>
      {listView.filters.map(filter => (
        <FilterInput key={filter.name} filter={filter} />
      ))}
    </Wrapper>
  )
}

export default Filters
