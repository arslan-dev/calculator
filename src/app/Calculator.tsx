import { useSelector } from "react-redux"
import { RootState } from "./store"

import { DigitButton } from "./DigitBtn"
import { OperatorBtn } from "./OperatorBtn"
import { EOperator } from "../features/mathCore"

export const Calculator = () => {
  const displayNumber = useSelector((state: RootState) => {
    if (state.memory.opBtnPressed) {
      return state.memory.acc
    } else {
      return state.memory.num
    }
  })

  return (
    <div className="calculator">
      <div className="screen">
        {displayNumber}
      </div>

      <DigitButton digit={7} />
      <DigitButton digit={8} />
      <DigitButton digit={9} />
      <button type="button" className="btn btn-primary">C</button>
      <button type="button" className="btn btn-primary">AC</button>

      <DigitButton digit={4} />
      <DigitButton digit={5} />
      <DigitButton digit={6} />
      <OperatorBtn operator={EOperator.Multiplication} />
      <OperatorBtn operator={EOperator.Division} />

      <DigitButton digit={1} />
      <DigitButton digit={2} />
      <DigitButton digit={3} />
      <OperatorBtn operator={EOperator.Subtraction} />
      <button type="button" className="btn btn-primary equals-button">=</button>

      <button type="button" className="btn btn-primary">+/-</button>
      <DigitButton digit={0} />
      <button type="button" className="btn btn-primary">.</button>
      <OperatorBtn operator={EOperator.Addition} />
    </div>
  )
}