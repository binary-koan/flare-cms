import React from "react"

const FatalError: React.FunctionComponent<{ error: string }> = ({ error, ...props }) => (
  <div {...props}>Error: {error}</div>
)

export default FatalError
