import { describe, it, expect, test } from "vitest"
import FloatingPointNumber, { FPMaxDigitsExceededError } from "../features/FloatingPointNumber"

describe('Floating point number', () => {
  it('should work properly', () => {
    const fpNum = FloatingPointNumber.safelyFromNumber(2)
    const actualNum = fpNum.toNumber()
    expect(actualNum).eq(2)
  })

  test('unsafe conversion: it should throw FPMaxDigitsExceededError if the original number contains more than 8 symbols', () => {
    expect( () => FloatingPointNumber.unsafelyFromNumber(123456789) ).toThrow(FPMaxDigitsExceededError)
  })

  test('safe conversion: it should safely return tail of original number', () => {
    const fpNumber = FloatingPointNumber.safelyFromNumber(123456789)
    const actualNumber = fpNumber.toNumber()
    expect(actualNumber).eq(23456789)
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