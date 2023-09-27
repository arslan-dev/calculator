import { describe, it, expect } from "vitest"
import { CalculationError, EOperator, calculate } from "../features/mathCore"

describe('Test Math functions', () => {
  it('should add two numbers', () => {
    const actualSum = calculate(2, 3, EOperator.Addition)
    expect(actualSum).eq(5)
  })

  it('should subtract two numbers', () => {
    const actualDifference = calculate(2, 3, EOperator.Subtraction)
    expect(actualDifference).eq(-1)
  })

  it('should multiplicate two numbers', () => {
    const actualProduct = calculate(2, 3, EOperator.Multiplication)
    expect(actualProduct).eq(6)
  })

  it('should divide two numbers', () => {
    const actualQuotient = calculate(3, 2, EOperator.Division)
    expect(actualQuotient).eq(1.5)
  })

  it('should not divide by zero', () => {
    const actualQuotient = calculate(3, 0, EOperator.Division)
    expect(actualQuotient).eq(CalculationError)
  })
})