import { CalculatorError } from "./CalculatorError"
import { FloatingPointNumber, fpnToNum, numToFPN } from "./floatingPointNumberUtils"

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
    opFunction: (a, b) => fpnToNum(a) + fpnToNum(b)
  },
  Subtraction: {
    symbol: '-',
    opFunction: (a, b) => fpnToNum(a) - fpnToNum(b)
  },
  Multiplication: {
    symbol: '×',
    opFunction: (a, b) => fpnToNum(a) * fpnToNum(b)
  },
  Division: {
    symbol: '÷',
    opFunction: (a, b) => {
      const numA = fpnToNum(a)
      const numB = fpnToNum(b)
      if (numB === 0) {
        throw new ZeroDivisionError()
      }
      return numA / numB
    }
  }
}

export function calculate(a: FloatingPointNumber, b: FloatingPointNumber, op: EOperator): FloatingPointNumber {
  const raw = COperators[op].opFunction(a, b)
  return numToFPN(raw)
}