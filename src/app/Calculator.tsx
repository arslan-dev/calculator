import { useSelector } from "react-redux"
import { RootState } from "./store"
import { DigitButton } from "./DigitButton"

export const Calculator = () => {
  const expression = useSelector((state: RootState) => state.expression.numberA)

  return (
    <div className="calculator">
      <div className="screen">
        {expression}
      </div>

      <DigitButton digit={7} />
      <DigitButton digit={8} />
      <DigitButton digit={9} />
      <button type="button" className="btn btn-primary">+/-</button>
      <button type="button" className="btn btn-primary">AC</button>

      <DigitButton digit={4} />
      <DigitButton digit={5} />
      <DigitButton digit={6} />
      <button type="button" className="btn btn-primary">×</button>
      <button type="button" className="btn btn-primary">÷</button>

      <DigitButton digit={1} />
      <DigitButton digit={2} />
      <DigitButton digit={3} />
      <button type="button" className="btn btn-primary">-</button>
      <button type="button" className="btn btn-primary equals-button">=</button>

      <button type="button" className="btn btn-primary">C</button>
      <DigitButton digit={0} />
      <button type="button" className="btn btn-primary">.</button>
      <button type="button" className="btn btn-primary">+</button>
    </div>
  )
}