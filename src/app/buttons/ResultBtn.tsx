import { MouseEventHandler } from "react"
import { useDispatch } from "react-redux"

import { calculateResult } from "../../features/memory/memorySlice"

export const ResultBtn = () => {
  const dispatch = useDispatch()
  const onClick: MouseEventHandler<HTMLButtonElement> = () => dispatch(calculateResult())

  return <button
    type="button"
    className="btn btn-primary equals-btn"
    onClick={onClick}
  >
    =
  </button>
}