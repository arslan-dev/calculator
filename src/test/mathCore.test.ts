import { describe, it, expect } from "vitest"
import { EOperator, calculate } from "../features/mathCore"
import { FPMaxDigitsExceededError, safelyConvertToFPNum } from "../features/floatingPointNumber"

describe('Test Math functions', () => {

  describe('Addition', () => {

    it('should add two numbers', () => {
      const actualSum = calculate( safelyConvertToFPNum(2), safelyConvertToFPNum(3), EOperator.Addition)
      expect(actualSum).eq(5)

      const actualSum2 = calculate( safelyConvertToFPNum(99999998), safelyConvertToFPNum(1), EOperator.Addition)
      expect(actualSum2).eq(99999999)
    })

    it('should throw error if the result is exceeding max digits', () => {
      const numA = safelyConvertToFPNum(99999999)
      const numB = safelyConvertToFPNum(1)

      expect( () => calculate(numA, numB, EOperator.Addition) ).toThrow(FPMaxDigitsExceededError)
    })
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