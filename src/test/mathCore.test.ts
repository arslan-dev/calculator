import { describe, test, expect } from "vitest"
import { EOperator, calculate } from "../features/mathCore"
import FloatingPointNumber, { FPMaxDigitsExceededError } from "../features/FloatingPointNumber"

describe('Test Math functions', () => {
  test('Addition: should add two numbers', () => {
    const actualSum = calculate(
      FloatingPointNumber.safelyFromNumber(2),
      FloatingPointNumber.safelyFromNumber(3),
      EOperator.Addition
    )
    expect(actualSum.toNumber()).eq(5)

    const actualSum2 = calculate(
      FloatingPointNumber.safelyFromNumber(99999998),
      FloatingPointNumber.safelyFromNumber(1),
      EOperator.Addition
    )
    expect(actualSum2.toNumber()).eq(99999999)
  })

  test('Addition: should throw error if the result is exceeding max digits', () => {
    const numA = FloatingPointNumber.safelyFromNumber(99999999)
    const numB = FloatingPointNumber.safelyFromNumber(1)

    expect( () => calculate(numA, numB, EOperator.Addition) ).toThrow(FPMaxDigitsExceededError)
  })

  // it('should subtract two numbers', () => {
  //   const actualDifference = calculate(2, 3, EOperator.Subtraction)
  //   expect(actualDifference).eq(-1)
  // })

  // it('should multiplicate two numbers', () => {
  //   const actualProduct = calculate(2, 3, EOperator.Multiplication)
  //   expect(actualProduct).eq(6)
  // })

  // it('should divide two numbers', () => {
  //   const actualQuotient = calculate(3, 2, EOperator.Division)
  //   expect(actualQuotient).eq(1.5)
  // })

  // it('should not divide by zero', () => {
  //   const actualQuotient = calculate(3, 0, EOperator.Division)
  //   expect(actualQuotient).eq(CalculationError)
  // })
})