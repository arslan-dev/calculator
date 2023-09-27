
export enum EOperator {
  Addition = "Addition",
  Subtraction = "Subtraction",
  Multiplication = "Multiplication",
  Division = "Division"
}

interface TOperatorData {
  symbol: string,
  opFunction: (a: number, b: number) => number | TError 
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
        return "Error"
      } else {
        return a / b
      }
    }
  }
}

export type TError = "Error"

export function calculate(a: number, b: number, op: EOperator): number | TError {
  return COperators[op].opFunction(a, b)
}