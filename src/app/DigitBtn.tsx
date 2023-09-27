import { useDispatch } from "react-redux"
import { digitAdded } from "../features/expression/expressionSlice"

export interface TDigitButtonProps {
  digit: number
}

export const DigitButton = (props: TDigitButtonProps) => {
  const dispatch = useDispatch()
  const onDigitBtnClicked = (digit: number) => () => dispatch(digitAdded(digit))

  return <button
    type="button"
    className="btn btn-light border border-secondary"
    onClick={onDigitBtnClicked(props.digit)}
  >
    { props.digit }
  </button>
}