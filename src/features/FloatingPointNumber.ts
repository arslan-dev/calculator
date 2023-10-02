import { CalculatorError } from "./CalculatorError"

export class FPMaxDigitsExceededError extends CalculatorError {
  constructor() {
    super("Floating point number: max digits exceeded. A floating point number must have maximum of 8 digits.")
    this.name = "FPMaxDigitsExceededError"
  }
}

export class FPInvalidInputData extends CalculatorError {
  constructor(message: string) {
    super(`Invalid input data: ${message}`)
    this.name = "FPInvalidInputData"
  }
}

const MAX_DIGITS = 8
const MAX_DIGITS_FOR_ADDING_MORE = Math.pow(10, MAX_DIGITS-1)
const MAX_DIGIT_DIVISOR = Math.pow(10, MAX_DIGITS)
// const MAX_DIGITS_AFTER_POINT = 3;
// const POW_10_MAX_DIGITS = Math.pow(10, MAX_DIGITS_AFTER_POINT)

export interface FloatingPointNumber {
  significand: number;
  base: number;
}

// return new FloatingPointNumber
export function newFPN(significand: number = 0, base: number = 0): FloatingPointNumber {
  return {significand: significand, base: base}
}

/**
 * Add digit to initial Floating Point Number 
 * The function assumes the arguments are correct
 * It will not add more that 3 digits after the point
 * It will not add more than 8 digits in total
 * @param fpn Initial Floating Point Number
 * @param digit a new digit
 * @param addToTheRight adds digit to the right of the point if true and to the left if false
 * @returns a shallow copy of initial FPN with or without added digit
 */
export function addDigitToFPN(fpn: FloatingPointNumber, digit: number, addToTheRight: boolean = false): FloatingPointNumber {
  const copyFPN = {...fpn}

  if (!addToTheRight) {
    if (copyFPN.significand < MAX_DIGITS_FOR_ADDING_MORE) {
      copyFPN.significand = 10*copyFPN.significand + digit
    }
  }
  else if (addToTheRight && copyFPN.base < 3) {
    copyFPN.significand = 10*copyFPN.significand + digit
    copyFPN.base += 1
  } 

  return copyFPN;
}

function exceedsMaxDigits(a: FloatingPointNumber): boolean {
  return Math.abs(a.significand) >= MAX_DIGIT_DIVISOR
}

export function unsafelyConvertToFPNum(a: number): FloatingPointNumber {
  const truncA = newFPN(Math.trunc(a))
  if (exceedsMaxDigits(truncA)) {
    throw new FPMaxDigitsExceededError
  }
  return truncA
}

export function safelyConvertToFPNum(a: number): FloatingPointNumber {
  // const truncA = Math.trunc(a*)
  const truncA = newFPN(Math.trunc(a) % MAX_DIGIT_DIVISOR)
  return truncA
}

export function convertToNumber(a: FloatingPointNumber): number {
  return a.significand
}