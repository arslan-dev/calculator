import { MouseEventHandler } from "react"
import { useDispatch } from "react-redux"

import { addPoint } from "../../features/memory/memorySlice"

export const AddPointBtn = () => {
  const dispatch = useDispatch()
  const onClick: MouseEventHandler<HTMLButtonElement> = () => dispatch(addPoint())

  return <button
    type="button"
    className="btn btn-secondary"
    onClick={onClick}
  >
    .
  </button>
}