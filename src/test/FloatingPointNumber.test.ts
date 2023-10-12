import { describe, it, expect } from "vitest"
import { FPNInvalidFunctionArguments, FPNMaxDigitsExceededError, addDigitToFPN, copyFPN, fpnToNum, negateFPN, newFPN, safelyNumToFPN, numToFPN } from "../features/floatingPointNumberUtils"

describe('Floating point number', () => {
  describe('Safe conversion', () => {

    it('should work properly', () => {
      expect( safelyNumToFPN(2) ).toEqual(newFPN(2))
      expect( safelyNumToFPN(99999999) ).toEqual(newFPN(99999999))
      expect( safelyNumToFPN(-99999999) ).toEqual(newFPN(-99999999))
    })

    it('should safely return the tail of original number', () => {
      expect( safelyNumToFPN(123456789) ).toEqual(newFPN(23456789))
      expect( safelyNumToFPN(-123456789) ).toEqual(newFPN(-23456789))
    })

    // it('should work for decimals without errors', () => {
    //   expect( safelyconverttofpnum(1.4) ).toequal(newfpn(14, 1))

    //   expect( safelyconverttofpnum(1.444) ).eq(1.444)
    //   expect( safelyconverttofpnum(1.4444) ).eq(1.444)

    //   expect( safelyconverttofpnum(-1.444) ).eq(-1.444)
    //   expect( safelyconverttofpnum(-1.4444) ).eq(-1.444)
    // })
  })

  describe('Unsafe conversion', () => {

    it('should convert JS numbers to fpn', () => {
      expect(numToFPN(123.456)).toEqual(newFPN(123456, 3))
    })

    it('should throw FPMaxDigitsExceededError if the original number contains more than 8 symbols', () => {
      expect( () => numToFPN(123456789) ).toThrow(FPNMaxDigitsExceededError)
      expect( () => numToFPN(-123456789) ).toThrow(FPNMaxDigitsExceededError)
      expect( () => numToFPN(123456.789) ).toThrow(FPNMaxDigitsExceededError)
      expect( () => numToFPN(-123456.789) ).toThrow(FPNMaxDigitsExceededError)
    })
    
    it('should keep the precision of 3 digits after the point', () => {
      expect(numToFPN(123.1234)).toEqual(newFPN(123123, 3))
    })
  })

  describe('FPN creation', () => {
    it('should be able to create new Floating point number', () => {
      expect( newFPN(1, 2) ).toEqual({ significand: 1, base: 2} )
    })

    it('should throw an error if provided with non-integer arguments', () => {
      expect( () => newFPN(1.5) ).toThrowError(FPNInvalidFunctionArguments)
      expect( () => newFPN(1, 1.5) ).toThrowError(FPNInvalidFunctionArguments)
      expect( () => newFPN(1, 4)).toThrowError(FPNInvalidFunctionArguments)
    })

    it('should throw an error if provided with too many digits', () => {
      expect( () => newFPN(123456789) ).toThrowError(FPNMaxDigitsExceededError)
    })

    it('should be able to copy existing FPN', () => {
      const fpn = newFPN(1, 2)
      const fpnCopy = copyFPN(fpn)
      
      expect(fpn).toEqual(fpnCopy)
      expect(fpn).not.eq(fpnCopy)
    })
  })

  describe('FPNum to number', () => {
    it('should convert FPNum to number safely', () => {
      expect(fpnToNum(newFPN(2))).eq(2)
    })
  })

  describe('Add digit', () => {
    it('should add digit to the Floating Point Number to the left of the point', () => {
      expect( addDigitToFPN(newFPN(1), 2)).toEqual(newFPN(12))
    })

    it('should add digit to the Floating Point Number to the right of the point', () => {
      expect( addDigitToFPN(newFPN(1), 2, true) ).toEqual(newFPN(12, 1))
      expect( addDigitToFPN(newFPN(112, 2), 3, true) ).toEqual(newFPN(1123, 3))
    })

    it("shouldn't add more than three digits after the point", () => {
      expect( addDigitToFPN(newFPN(1123, 3), 4, true) ).toEqual(newFPN(1123, 3))
    })

    it("shouldn't add more than eight digit in total", () => {
      expect( addDigitToFPN(newFPN(12345678, 0), 9) ).toEqual(newFPN(12345678, 0))
      expect( addDigitToFPN(newFPN(12345678, 3), 9, true) ).toEqual(newFPN(12345678, 3))
    })
  })

  describe('Negate', () => {
    it("should negate", () => {
      expect( negateFPN( newFPN(12345678) )).toEqual( newFPN( -12345678 ))
    })
  })

  describe('To Number', () => {
    it("should convert FPN to number", () => {
      expect( fpnToNum(newFPN(12345678)) ).eq( 12345678 )
      expect( fpnToNum(newFPN(12345678, 3)) ).eq( 12345.678 )

      expect( fpnToNum(newFPN(-12345678)) ).eq( -12345678 )
      expect( fpnToNum(newFPN(-12345678, 3)) ).eq( -12345.678 )
    })
  })
})