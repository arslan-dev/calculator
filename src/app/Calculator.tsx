import { useDispatch, useSelector } from "react-redux"
import { RootState } from "./store"
import { digitAdded } from "../features/expression/expressionSlice"
import { DigitButton } from "./DigitButton"

export const Calculator = () => {
  const dispatch = useDispatch()
  const expression = useSelector((state: RootState) => state.expression.numberA)

  const onDigitBtnClicked = (digit: number) => () => dispatch(digitAdded(digit))

  return (
    <div className="calculator">
      <div className="screen">
        {expression}
      </div>

      <DigitButton digit={7} onClick={onDigitBtnClicked} />
      <DigitButton digit={8} onClick={onDigitBtnClicked} />
      <DigitButton digit={9} onClick={onDigitBtnClicked} />
      <button type="button" className="btn btn-primary">+/-</button>
      <button type="button" className="btn btn-primary">AC</button>

      <DigitButton digit={4} onClick={onDigitBtnClicked} />
      <DigitButton digit={5} onClick={onDigitBtnClicked} />
      <DigitButton digit={6} onClick={onDigitBtnClicked} />
      <button type="button" className="btn btn-primary">×</button>
      <button type="button" className="btn btn-primary">÷</button>

      <DigitButton digit={1} onClick={onDigitBtnClicked} />
      <DigitButton digit={2} onClick={onDigitBtnClicked} />
      <DigitButton digit={3} onClick={onDigitBtnClicked} />
      <button type="button" className="btn btn-primary">-</button>
      <button type="button" className="btn btn-primary equals-button">=</button>

      <button type="button" className="btn btn-primary">C</button>
      <DigitButton digit={0} onClick={onDigitBtnClicked} />
      <button type="button" className="btn btn-primary">.</button>
      <button type="button" className="btn btn-primary">+</button>
    </div>
  )
}