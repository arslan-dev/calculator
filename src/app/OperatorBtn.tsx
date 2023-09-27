import { MouseEventHandler } from "react"
import { useDispatch } from "react-redux"

import { addOperator } from "../features/expression/memorySlice"
import { COperators, EOperator } from "../features/mathCore"

export interface TOperatorBtnProps {
  operator: EOperator
}

export const OperatorBtn = (props: TOperatorBtnProps) => {
  const dispatch = useDispatch()
  const onClick: MouseEventHandler<HTMLButtonElement> = () => dispatch(addOperator(props.operator))

  return <button
    type="button"
    className="btn btn-dark border border-secondary"
    onClick={onClick}
  >
    { COperators[props.operator].symbol }
  </button>
}