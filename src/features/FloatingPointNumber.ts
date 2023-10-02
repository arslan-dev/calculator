import { CalculatorError } from "./CalculatorError"

export class FPMaxDigitsExceededError extends CalculatorError {
  constructor() {
    super("Floating point number: max digits exceeded. A floating point number must have maximum of 8 digits.")
    this.name = "FPMaxDigitsExceededError"
  }
}

const MAX_DIGIT_DIVISOR = Math.pow(10, 8)

export interface FloatingPointNumber {
  s: number; // significand
  // b: number; // base
}

function exceedsMaxDigits(a: FloatingPointNumber): boolean {
  return Math.abs(a.s) >= MAX_DIGIT_DIVISOR
}

export function unsafelyConvertToFPNum(a: number): FloatingPointNumber {
  const truncA: FloatingPointNumber = {
    s: Math.trunc(a)
  }
  if (exceedsMaxDigits(truncA)) {
    throw new FPMaxDigitsExceededError
  }
  return truncA
}

export function safelyConvertToFPNum(a: number): FloatingPointNumber {
  const truncA: FloatingPointNumber = {
    s: Math.trunc(a) % MAX_DIGIT_DIVISOR
  }
  return truncA
}

export function convertToNumber(a: FloatingPointNumber): number {
  return a.s
}