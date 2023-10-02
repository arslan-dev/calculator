class CalculatorError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "CalculatorError"
  }
}

export class FPMaxDigitsExceededError extends CalculatorError {
  constructor() {
    super("Floating point number: max digits exceeded. A floating point number must have maximum of 8 digits.")
    this.name = "FPMaxDigitsExceededError"
  }
}

const MAX_DIGIT_DIVISOR = Math.pow(10, 8)

export function unsafelyConvertToFPNum(a: number): number {
  const truncA = Math.trunc(a)
  if (truncA >= MAX_DIGIT_DIVISOR) {
    throw new FPMaxDigitsExceededError
  }
  return truncA
}

export function safelyConvertToFPNum(a: number): number {
  const truncA = Math.trunc(a)
  return truncA % MAX_DIGIT_DIVISOR
}