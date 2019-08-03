import "react-redux"
import { Dispatch } from "redux"
import { Action, State } from "../store/types"

declare module "react-redux" {
  export function useDispatch(): Dispatch<Action>

  export function useSelector<TSelected>(
    selector: (state: State) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected
}
