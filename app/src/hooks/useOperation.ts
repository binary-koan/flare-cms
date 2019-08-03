import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import { Action } from "../store/types"

function useOperation<Options>(operation: (dispatch: Dispatch<Action>) => void): () => void
function useOperation<Options>(
  operation: (dispatch: Dispatch<Action>, options: Options) => void
): (options: Options) => void {
  const dispatch = useDispatch()

  return options => {
    operation(dispatch, options)
  }
}

export default useOperation
