import React from "react"

const TextField: React.FunctionComponent<{
  value: string
  stripHtml?: boolean
  truncate?: number
}> = ({ value, stripHtml, truncate }) => {
  if (stripHtml) {
    const element = document.createElement("div")
    element.innerHTML = value

    value = element.innerText
  }

  if (truncate && value.length > truncate) {
    value = value.slice(0, truncate) + "..."
  }

  return <>{value}</>
}

export default TextField
