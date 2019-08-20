import React from "react"

const JsonField: React.FunctionComponent<{ value: any }> = ({ value }) => (
  <>{JSON.stringify(value)}</>
)

export default JsonField
