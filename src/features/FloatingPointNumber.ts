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

export default class FloatingPointNumber {
  private _significand: number
  // private _exponent: number

  constructor(num: number) { 
    this._significand = Math.trunc(num)
    if (this._significand >= MAX_DIGIT_DIVISOR) {
      throw new FPMaxDigitsExceededError
    }
  }

  toNumber() {
    return this._significand
  }

  significandLength() {
    return this._significand > 9999999 
  }

  static unsafelyFromNumber(a: number): FloatingPointNumber {
    return new FloatingPointNumber(a)
  }

  static safelyFromNumber(a: number): FloatingPointNumber {
    return new FloatingPointNumber(a % MAX_DIGIT_DIVISOR)
  }
}