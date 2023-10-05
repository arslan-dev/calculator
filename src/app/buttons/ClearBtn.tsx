import { MouseEventHandler } from "react"
import { useDispatch } from "react-redux"

import { clearCurrentOperand } from "../../features/memory/memorySlice"

export const ClearBtn = () => {
  const dispatch = useDispatch()
  const onClick: MouseEventHandler<HTMLButtonElement> = () => dispatch(clearCurrentOperand())

  return <button
    type="button"
    className="btn btn-danger"
    onClick={onClick}
  >
    C
  </button>
}