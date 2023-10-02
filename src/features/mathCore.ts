import FloatingPointNumber from "./FloatingPointNumber"

export enum EOperator {
  Addition = "Addition",
  // Subtraction = "Subtraction",
  // Multiplication = "Multiplication",
  // Division = "Division"
}

interface TOperatorData {
  symbol: string,
  opFunction: (a: FloatingPointNumber, b: FloatingPointNumber) => FloatingPointNumber
}

type TOperators = {
  [key in EOperator]: TOperatorData
}

function Add(a: FloatingPointNumber, b: FloatingPointNumber): FloatingPointNumber {
  const sum = a.toNumber() + b.toNumber()
  return new FloatingPointNumber(sum)
}

export const COperators: TOperators = {
  Addition: {
    symbol: '+',
    opFunction: (a, b) => Add(a, b)
  },
  // Subtraction: {
  //   symbol: '-',
  //   opFunction: (a, b) => a-b
  // },
  // Multiplication: {
  //   symbol: '×',
  //   opFunction: (a, b) => a*b
  // },
  // Division: {
  //   symbol: '÷',
  //   opFunction: (a, b) => {
  //     if (b === 0) {
  //       return "Error"
  //     } else {
  //       return a / b
  //     }
  //   }
  // }
}

export function calculate(a: FloatingPointNumber, b: FloatingPointNumber, op: EOperator): FloatingPointNumber {
  return COperators[op].opFunction(a, b)
}