import { CalculatorError } from "./CalculatorError"
import { unsafelyConvertToFPNum } from "./floatingPointNumber"

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
  opFunction: (a: number, b: number) => number
}

type TOperators = {
  [key in EOperator]: TOperatorData
}

export const COperators: TOperators = {
  Addition: {
    symbol: '+',
    opFunction: (a, b) => a+b
  },
  Subtraction: {
    symbol: '-',
    opFunction: (a, b) => a-b
  },
  Multiplication: {
    symbol: '×',
    opFunction: (a, b) => a*b
  },
  Division: {
    symbol: '÷',
    opFunction: (a, b) => {
      if (b === 0) {
        throw new ZeroDivisionError()
      }
      return a / b
    }
  }
}

export function calculate(a: number, b: number, op: EOperator): number {
  const raw = COperators[op].opFunction(a, b)
  return unsafelyConvertToFPNum(raw)
}