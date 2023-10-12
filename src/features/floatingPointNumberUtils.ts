import { CalculatorError } from "./CalculatorError"

export class FPNMaxDigitsExceededError extends CalculatorError {
  constructor() {
    super("Floating point number: max digits exceeded. A floating point number must have maximum of 8 digits.")
    this.name = "FPMaxDigitsExceededError"
  }
}

export class FPNInvalidInputData extends CalculatorError {
  constructor(message: string) {
    super(`Invalid input data: ${message}`)
    this.name = "FPInvalidInputData"
  }
}

export class FPNInvalidFunctionArguments extends CalculatorError {
  constructor(message: string) {
    super(`Invalid function arguments: ${message}`)
    this.name = 'FPNInvalidFunctionArguments'
  }
}

const MAX_DIGITS = 8
const MAX_DIGITS_FOR_ADDING_MORE = Math.pow(10, MAX_DIGITS-1)
const MAX_DIGIT_DIVISOR = Math.pow(10, MAX_DIGITS)
const MAX_DIGITS_AFTER_POINT = 3;
const POW_10_MAX_DIGITS = Math.pow(10, MAX_DIGITS_AFTER_POINT)

export interface FloatingPointNumber {
  significand: number;
  base: number;
}

// return new FloatingPointNumber
export function newFPN(significand: number = 0, base: number = 0): FloatingPointNumber {
  if (significand % 1 !== 0 || base % 1 !== 0) {
    throw new FPNInvalidFunctionArguments('newFPN arguments must be integer')
  }
  if (Math.abs(significand) >= MAX_DIGIT_DIVISOR) {
    throw new FPNMaxDigitsExceededError()
  }
  if (base < 0 || base > 3) {
    throw new FPNInvalidFunctionArguments('base should be an integer in range [0..3]')
  }
  return {significand: significand, base: base}
}

export function copyFPN(fpn: FloatingPointNumber): FloatingPointNumber {
  return {...fpn}
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

/**
 * negates a floating point number
 * @param fpn the original Floating point number
 * @returns negated copy of the Original FPN
 */
export function negateFPN(fpn: FloatingPointNumber) {
  return newFPN(-fpn.significand, fpn.base)
}

export function fpnToNum(fpn: FloatingPointNumber) {
  return fpn.significand / Math.pow(10, fpn.base)
}

export function numToFPN(a: number): FloatingPointNumber {
  let significand = Math.round( a * POW_10_MAX_DIGITS )
  let base = MAX_DIGITS_AFTER_POINT

  while (base > 0 && significand % 10 === 0) {
    significand /= 10
    base -= 1
  }

  return newFPN(significand, base)
}

export function safelyNumToFPN(a: number): FloatingPointNumber {
  const truncA = newFPN(Math.trunc(a) % MAX_DIGIT_DIVISOR)
  return truncA
}