import { MouseEventHandler } from "react"
import { useDispatch } from "react-redux"

import { clearCurrentInput } from "../../features/memory/memorySlice"

export const ClearBtn = () => {
  const dispatch = useDispatch()
  const onClick: MouseEventHandler<HTMLButtonElement> = () => dispatch(clearCurrentInput())

  return <button
    type="button"
    className="btn btn-danger"
    onClick={onClick}
  >
    C
  </button>
}