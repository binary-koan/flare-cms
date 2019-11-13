import { __RouterContext as RouterContext } from "react-router"
import { useContext } from "react"

const useRouter = () => useContext(RouterContext)

export default useRouter
