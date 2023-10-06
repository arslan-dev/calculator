import { describe, it, expect } from "vitest"
import { EOperator, ZeroDivisionError, calculate } from "../features/mathCore"
import { FPNMaxDigitsExceededError, newFPN, numToFPN, safelyNumToFPN} from "../features/floatingPointNumber"

describe('Math functions', () => {

  describe('Addition', () => {

    it('should add two integer numbers', () => {
      expect( calculate( safelyNumToFPN(2), safelyNumToFPN(3), EOperator.Addition) ).toEqual(newFPN(5))
      expect( calculate( safelyNumToFPN(99999998), safelyNumToFPN(1), EOperator.Addition) ).toEqual(newFPN(99999999))
    })

    it('should add two decimal numbers', () => {
      expect( calculate( numToFPN(2.2), numToFPN(3.3), EOperator.Addition) ).toEqual(numToFPN(5.5))
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

  describe('Multiplication', () => {
    it('should multiplicate two numbers', () => {
      expect( calculate(numToFPN(2), numToFPN(3), EOperator.Multiplication) ).toEqual(numToFPN(6))
      expect( calculate(numToFPN(-2), numToFPN(3), EOperator.Multiplication) ).toEqual(numToFPN(-6))
      expect( calculate(numToFPN(-2), numToFPN(-3), EOperator.Multiplication) ).toEqual(numToFPN(6))
    })

    it('should throw error if the result is exceeding max digits', () => {
      const numA = numToFPN(99999999)
      const numB = numToFPN(2)

      expect( () => calculate(numA, numB, EOperator.Multiplication) ).toThrow(FPNMaxDigitsExceededError)
    })
  })

  describe('Division', () => {

    it('should divide two numbers', () => {
      expect( calculate(numToFPN(3), numToFPN(2), EOperator.Division) ).toEqual(numToFPN(1.5))
    })

    it('should not divide by zero', () => {
      expect( () => calculate(numToFPN(3), numToFPN(0), EOperator.Division)).toThrow(ZeroDivisionError)
    })
  })


})