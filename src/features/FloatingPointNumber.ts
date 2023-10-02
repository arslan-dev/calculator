import { CalculatorError } from "./CalculatorError"

export class FPMaxDigitsExceededError extends CalculatorError {
  constructor() {
    super("Floating point number: max digits exceeded. A floating point number must have maximum of 8 digits.")
    this.name = "FPMaxDigitsExceededError"
  }
}

const MAX_DIGIT_DIVISOR = Math.pow(10, 8)

function exceedsMaxDigits(a: number): boolean {
  return Math.abs(a) >= MAX_DIGIT_DIVISOR
}

export function unsafelyConvertToFPNum(a: number): number {
  const truncA = Math.trunc(a)
  if (exceedsMaxDigits(truncA)) {
    throw new FPMaxDigitsExceededError
  }
  return truncA
}

export function safelyConvertToFPNum(a: number): number {
  const truncA = Math.trunc(a)
  return truncA % MAX_DIGIT_DIVISOR
}