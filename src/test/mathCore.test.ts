import { describe, it, expect } from "vitest"
import { EOperator, calculate } from "../features/mathCore"
import { FPNMaxDigitsExceededError, newFPN, safelyNumToFPN} from "../features/floatingPointNumber"

describe('Math functions', () => {

  describe('Addition', () => {

    it('should add two integer numbers', () => {
      expect( calculate( safelyNumToFPN(2), safelyNumToFPN(3), EOperator.Addition) ).toEqual(newFPN(5))
      expect( calculate( safelyNumToFPN(99999998), safelyNumToFPN(1), EOperator.Addition) ).toEqual(newFPN(99999999))
    })

    it('should add two decimal numbers', () => {
      expect( calculate( newFPN(2.2), newFPN(3.3), EOperator.Addition) ).toEqual(newFPN(5.5))
    })

    it('should throw error if the result is exceeding max digits', () => {
      const numA = safelyNumToFPN(99999999)
      const numB = safelyNumToFPN(1)

      expect( () => calculate(numA, numB, EOperator.Addition) ).toThrow(FPNMaxDigitsExceededError)
    })
  })

  describe('Subtraction', () => {

    it('should subtract two numbers', () => {
      expect( calculate( safelyNumToFPN(2), safelyNumToFPN(3), EOperator.Subtraction) ).toEqual(newFPN(-1))
      expect( calculate( safelyNumToFPN(-99999998), safelyNumToFPN(1), EOperator.Subtraction) ).toEqual(newFPN(-99999999))
    })

    it('should throw error if the result is exceeding max digits', () => {
      const numA = safelyNumToFPN(-99999999)
      const numB = safelyNumToFPN(1)

      expect( () => calculate(numA, numB, EOperator.Subtraction) ).toThrow(FPNMaxDigitsExceededError)
    })
  })

  // describe('Multiplication', () => {
  //   it('should multiplicate two numbers', () => {
  //     expect( calculate(safelyConvertToFPNum(2), safelyConvertToFPNum(3), EOperator.Multiplication) ).toEqual({s: 6})
  //     expect( calculate(safelyConvertToFPNum(-2), safelyConvertToFPNum(3), EOperator.Multiplication) ).toEqual({s: -6})
  //     expect( calculate(safelyConvertToFPNum(-2), safelyConvertToFPNum(-3), EOperator.Multiplication) ).toEqual({s: 6})
  //   })

  //   it('should throw error if the result is exceeding max digits', () => {
  //     const numA = safelyConvertToFPNum(99999999)
  //     const numB = safelyConvertToFPNum(2)

  //     expect( () => calculate(numA, numB, EOperator.Multiplication) ).toThrow(FPMaxDigitsExceededError)
  //   })
  // })

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