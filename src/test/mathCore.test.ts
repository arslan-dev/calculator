import { describe, it, expect } from "vitest"
import { EOperator, calculate } from "../features/mathCore"

describe('Test Math functions', () => {
  it('should add two numbers', () => {
    const actualSum = calculate(2, 3, EOperator.Addition)
    expect(actualSum).eq(5)
  })
})