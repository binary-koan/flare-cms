import { ListAction, ListState } from "./list/types"
import { FormAction, FormState } from "./form/types"

export type State = {
  list: ListState
  form: FormState
}

export type Action = ListAction | FormAction
