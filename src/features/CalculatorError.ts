export class CalculatorError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "CalculatorError"
  }
}
