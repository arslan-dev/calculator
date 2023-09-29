import { MouseEventHandler } from "react"
import { useDispatch } from "react-redux"

import { toggleNegative } from "../../features/expression/memorySlice"

export const ToggleNegativeBtn = () => {
  const dispatch = useDispatch()
  const onClick: MouseEventHandler<HTMLButtonElement> = () => dispatch(toggleNegative())

  return <button
    type="button"
    className="btn btn-secondary"
    onClick={onClick}
  >
    +/-
  </button>
}