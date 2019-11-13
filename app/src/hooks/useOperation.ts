import { Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"
import { Action, State } from "../store/types"

function useOperation<Options>(
  operation: (dispatch: Dispatch<Action>, state: State) => void
): () => void
function useOperation<Options>(
  operation: (dispatch: Dispatch<Action>, state: State, options: Options) => void
): (options: Options) => void
function useOperation<Options>(
  operation: (dispatch: Dispatch<Action>, state: State, options: Options) => void
): (options: Options) => void {
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  return options => {
    operation(dispatch, state, options)
  }
}

export default useOperation
