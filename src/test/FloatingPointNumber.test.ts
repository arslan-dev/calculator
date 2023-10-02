import { describe, it, expect, test } from "vitest"
import { FPMaxDigitsExceededError, safelyConvertToFPNum, unsafelyConvertToFPNum } from "../features/floatingPointNumber"

describe('Floating point number', () => {
  it('should work properly', () => {
    const actualFPNum = safelyConvertToFPNum(2)
    expect(actualFPNum).eq(2)
  })

  test('unsafe conversion: it should throw FPMaxDigitsExceededError if the original number contains more than 8 symbols', () => {
    expect( () => unsafelyConvertToFPNum(123456789) ).toThrow(FPMaxDigitsExceededError)
  })

  test('safe conversion: it should safely return tail of original number', () => {
    const actualFPNum = safelyConvertToFPNum(123456789)
    expect(actualFPNum).eq(23456789)
  })
})