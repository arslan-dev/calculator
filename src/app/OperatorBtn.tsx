import { MouseEventHandler } from "react"
import { useDispatch } from "react-redux"

import { operatorAdded } from "../features/expression/memorySlice"
import { COperatorData, EOperator } from "../features/mathCore"

export interface TOperatorBtnProps {
  operator: EOperator
}

export const OperatorBtn = (props: TOperatorBtnProps) => {
  const dispatch = useDispatch()
  const onClick: MouseEventHandler<HTMLButtonElement> = () => dispatch(operatorAdded(props.operator))

  return <button
    type="button"
    className="btn btn-dark border border-secondary"
    onClick={onClick}
  >
    { COperatorData[props.operator] }
  </button>
}