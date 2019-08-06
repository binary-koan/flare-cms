import { useRef } from "react"

let uid = 0

const useUniqueId = (base: string = "") => {
  const ref = useRef(`${base}-${uid}`)

  return ref.current
}

export default useUniqueId
