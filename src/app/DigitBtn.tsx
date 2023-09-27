import { MouseEventHandler } from "react"
import { useDispatch } from "react-redux"

import { digitAdded } from "../features/expression/memorySlice"

export interface TDigitButtonProps {
  digit: number
}

export const DigitButton = (props: TDigitButtonProps) => {
  const dispatch = useDispatch()
  const onClick: MouseEventHandler<HTMLButtonElement> = () => dispatch(digitAdded(props.digit))
  // const onKeyDown: KeyboardEventHandler<HTMLButtonElement> = (e) => {
  //   console.log(e.key)
  //   if (e.key === `${props.digit}`) {
  //     digitAdded(props.digit)
  //   }
  // }

  return <button
    type="button"
    className="btn btn-light border border-secondary"
    onClick={onClick}
    // onKeyDown={onKeyDown}
  >
    { props.digit }
  </button>
}