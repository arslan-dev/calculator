import { MouseEventHandler } from "react"
import { useDispatch } from "react-redux"

import { clearAll } from "../../features/expression/memorySlice"

export const ClearAllBtn = () => {
  const dispatch = useDispatch()
  const onClick: MouseEventHandler<HTMLButtonElement> = () => dispatch(clearAll())

  return <button
    type="button"
    className="btn btn-danger"
    onClick={onClick}
  >
    AC
  </button>
}