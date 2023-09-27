
export enum EOperator {
  Addition = "Addition",
  Subtraction = "Subtraction",
  Multiplication = "Multiplication",
  Division = "Division"
}

// export const operatorSymbols: {[Property in keyof EOperator]: string} = [
//   EOperator.Addition: '+'
// ]

type TOperatorData = {
  [key in EOperator]: string
}

export const COperatorData: TOperatorData = {
  Addition: '+',
  Subtraction: '-',
  Multiplication: '×',
  Division: '÷'
}