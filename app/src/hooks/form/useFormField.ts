import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { get } from "lodash"

export default function useFormField(path: string[]) {
  const value = useSelector(state => get(state.form.fieldValues, path), shallowEqual)
  const dispatch = useDispatch()

  return {
    value,
    onChange: (value: any) => dispatch({ namespace: "form", type: "edit", path, value })
  }
}
