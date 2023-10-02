import { describe, it, expect } from "vitest"
import { EOperator, calculate } from "../features/mathCore"
import { FPMaxDigitsExceededError, safelyConvertToFPNum } from "../features/floatingPointNumber"

describe('Test Math functions', () => {

  describe('Addition', () => {

    it('should add two numbers', () => {
      expect( calculate( safelyConvertToFPNum(2), safelyConvertToFPNum(3), EOperator.Addition) ).toEqual({ s: 5 })
      expect( calculate( safelyConvertToFPNum(99999998), safelyConvertToFPNum(1), EOperator.Addition) ).toEqual({ s: 99999999 })
    })

    it('should throw error if the result is exceeding max digits', () => {
      const numA = safelyConvertToFPNum(99999999)
      const numB = safelyConvertToFPNum(1)

      expect( () => calculate(numA, numB, EOperator.Addition) ).toThrow(FPMaxDigitsExceededError)
    })
  })

  describe('Subtraction', () => {

    it('should subtract two numbers', () => {
      expect( calculate( safelyConvertToFPNum(2), safelyConvertToFPNum(3), EOperator.Subtraction) ).toEqual({s: -1})
      expect( calculate( safelyConvertToFPNum(-99999998), safelyConvertToFPNum(1), EOperator.Subtraction) ).toEqual({s: -99999999})
    })

    it('should throw error if the result is exceeding max digits', () => {
      const numA = safelyConvertToFPNum(-99999999)
      const numB = safelyConvertToFPNum(1)

      expect( () => calculate(numA, numB, EOperator.Subtraction) ).toThrow(FPMaxDigitsExceededError)
    })
  })

  describe('Multiplication', () => {
    it('should multiplicate two numbers', () => {
      expect( calculate(safelyConvertToFPNum(2), safelyConvertToFPNum(3), EOperator.Multiplication) ).toEqual({s: 6})
      expect( calculate(safelyConvertToFPNum(-2), safelyConvertToFPNum(3), EOperator.Multiplication) ).toEqual({s: -6})
      expect( calculate(safelyConvertToFPNum(-2), safelyConvertToFPNum(-3), EOperator.Multiplication) ).toEqual({s: 6})
    })

    it('should throw error if the result is exceeding max digits', () => {
      const numA = safelyConvertToFPNum(99999999)
      const numB = safelyConvertToFPNum(2)

      expect( () => calculate(numA, numB, EOperator.Multiplication) ).toThrow(FPMaxDigitsExceededError)
    })
  })

  // describe('Division', () => {

  //   it('should divide two numbers', () => {
  //     expect( calculate(safelyConvertToFPNum(3), safelyConvertToFPNum(2), EOperator.Division) ).eq(1.5)
  //   })
  // })


  // it('should not divide by zero', () => {
  //   const actualQuotient = calculate(3, 0, EOperator.Division)
  //   expect(actualQuotient).eq(CalculationError)
  // })
})