import { describe, it, expect } from "vitest"
import { FPMaxDigitsExceededError, convertToNumber, safelyConvertToFPNum, unsafelyConvertToFPNum } from "../features/floatingPointNumber"

describe('Floating point number', () => {
  describe('Safe conversion', () => {

    it('should work properly', () => {
      expect( safelyConvertToFPNum(2) ).toEqual({ s: 2 })
      expect( safelyConvertToFPNum(99999999) ).toEqual({ s: 99999999 })
      expect( safelyConvertToFPNum(-99999999) ).toEqual({ s: -99999999 })
    })

    it('should safely return the tail of original number', () => {
      expect( safelyConvertToFPNum(123456789) ).toEqual({ s: 23456789 })
      expect( safelyConvertToFPNum(-123456789) ).toEqual({ s: -23456789 })
    })

    // it('should work for decimals without errors', () => {
    //   expect( safelyConvertToFPNum(1.4) ).eq(1.5)

    //   expect( safelyConvertToFPNum(1.444) ).eq(1.444)
    //   expect( safelyConvertToFPNum(1.4444) ).eq(1.444)

    //   expect( safelyConvertToFPNum(-1.444) ).eq(-1.444)
    //   expect( safelyConvertToFPNum(-1.4444) ).eq(-1.444)
    // })
  })

  describe('Unsafe conversion', () => {

    it('should throw FPMaxDigitsExceededError if the original number contains more than 8 symbols', () => {
      expect( () => unsafelyConvertToFPNum(123456789) ).toThrow(FPMaxDigitsExceededError)
      expect( () => unsafelyConvertToFPNum(-123456789) ).toThrow(FPMaxDigitsExceededError)
    })
  })

  describe('FPNum to number', () => {
    it('should convert FPNum to number safely', () => {
      expect(convertToNumber({ s: 2 })).eq(2)
    })
  })

})