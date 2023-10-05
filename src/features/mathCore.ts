import { CalculatorError } from "./CalculatorError"
import { FloatingPointNumber, fpnToNumber, unsafelyConvertToFPNum } from "./floatingPointNumber"

export class ZeroDivisionError extends CalculatorError {
  constructor() {
    super("You cannot divide by zero")
    this.name = "ZeroDivisionError"
  }
}

export enum EOperator {
  Addition = "Addition",
  Subtraction = "Subtraction",
  Multiplication = "Multiplication",
  Division = "Division"
}

interface TOperatorData {
  symbol: string,
  opFunction: (a: FloatingPointNumber, b: FloatingPointNumber) => number
}

type TOperators = {
  [key in EOperator]: TOperatorData
}

export const COperators: TOperators = {
  Addition: {
    symbol: '+',
    opFunction: (a, b) => fpnToNumber(a) + fpnToNumber(b)
  },
  Subtraction: {
    symbol: '-',
    opFunction: (a, b) => fpnToNumber(a) - fpnToNumber(b)
  },
  Multiplication: {
    symbol: '×',
    opFunction: (a, b) => fpnToNumber(a) * fpnToNumber(b)
  },
  Division: {
    symbol: '÷',
    opFunction: (a, b) => {
      const numA = fpnToNumber(a)
      const numB = fpnToNumber(b)
      if (numB === 0) {
        throw new ZeroDivisionError()
      }
      return numA / numB
    }
  }
}

export function calculate(a: FloatingPointNumber, b: FloatingPointNumber, op: EOperator): FloatingPointNumber {
  const raw = COperators[op].opFunction(a, b)
  return unsafelyConvertToFPNum(raw)
}