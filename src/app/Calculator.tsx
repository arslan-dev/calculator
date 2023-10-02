import { EOperator } from "../features/mathCore"

import { DigitBtn } from "./buttons/DigitBtn"
import { OperatorBtn } from "./buttons/OperatorBtn"
import { ClearBtn } from "./buttons/ClearBtn"
import { ClearAllBtn } from "./buttons/ClearAllBtn"
import { ResultBtn } from "./buttons/ResultBtn"
import { ToggleNegativeBtn } from "./buttons/ToggleNegativeBtn"
import { MemoryView } from "./MemoryView"
import { Screen } from "./Screen"

export const Calculator = () => {

  return (
    <div className="calculator">
      <MemoryView />
      <Screen />

      <DigitBtn digit={7} />
      <DigitBtn digit={8} />
      <DigitBtn digit={9} />
      <ClearBtn />
      <ClearAllBtn />

      <DigitBtn digit={4} />
      <DigitBtn digit={5} />
      <DigitBtn digit={6} />
      <OperatorBtn operator={EOperator.Multiplication} />
      <OperatorBtn operator={EOperator.Division} />

      <DigitBtn digit={1} />
      <DigitBtn digit={2} />
      <DigitBtn digit={3} />
      <OperatorBtn operator={EOperator.Subtraction} />
      <ResultBtn />

      <ToggleNegativeBtn />
      <DigitBtn digit={0} />
      <button type="button" className="btn btn-primary">.</button>
      <OperatorBtn operator={EOperator.Addition} />
    </div>
  )
}