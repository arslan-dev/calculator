import { describe, it, expect } from "vitest"
import { FPMaxDigitsExceededError, safelyConvertToFPNum, unsafelyConvertToFPNum } from "../features/floatingPointNumber"

describe('Floating point number', () => {
  describe('Safe conversion', () => {

    it('should work properly', () => {
      expect( safelyConvertToFPNum(2) ).eq(2)
      expect( safelyConvertToFPNum(99999999) ).eq(99999999)
      expect( safelyConvertToFPNum(-99999999) ).eq(-99999999)
    })

    it('should safely return tail of original number', () => {
      expect( safelyConvertToFPNum(123456789) ).eq(23456789)
      expect( safelyConvertToFPNum(-123456789) ).eq(-23456789)
    })
  })

  describe('Unsafe conversion', () => {

    it('should throw FPMaxDigitsExceededError if the original number contains more than 8 symbols', () => {
      expect( () => unsafelyConvertToFPNum(123456789) ).toThrow(FPMaxDigitsExceededError)
      expect( () => unsafelyConvertToFPNum(-123456789) ).toThrow(FPMaxDigitsExceededError)
    })
  })

})