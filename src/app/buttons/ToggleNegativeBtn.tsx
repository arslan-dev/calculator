import { MouseEventHandler } from "react"
import { useDispatch } from "react-redux"

import { toggleSign } from "../../features/memory/memorySlice"

export const ToggleNegativeBtn = () => {
  const dispatch = useDispatch()
  const onClick: MouseEventHandler<HTMLButtonElement> = () => dispatch(toggleSign())

  return <button
    type="button"
    className="btn btn-secondary"
    onClick={onClick}
  >
    +/-
  </button>
}