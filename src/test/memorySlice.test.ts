import { assert, describe, expect, it } from "vitest";
import memoryReducer, { TMemoryState, addDigit, addOperator, calculateResult } from "../features/memory/memorySlice";
import { fpnToNumber, newFPN } from "../features/floatingPointNumber";
import { EOperator } from "../features/mathCore";

const mockInitialState: TMemoryState = {
  current: newFPN(),
  temp1: null, // used when entering second number to temporary store the first number
  temp2: null, // used when showing the result to temporary store the second number

  operator: null,
  newDigitEntered: false,
  errorMessage: null
}

describe('Calculator workflow', () => {
  describe('Basic workflow', () => {
    
    it('should return the initial slice', () => {
      expect(memoryReducer(undefined, {type: undefined})).toEqual(mockInitialState)
    })

    it('should add digits to the current number', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(1))
      actualState = memoryReducer(actualState, addDigit(2))
      actualState = memoryReducer(actualState, addDigit(3))

      expect( fpnToNumber(actualState.current) ).eq(123)
    })
  })

  describe('Operator workflow', () => {

    it('should register operator and copy current number to temp1 register', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, addOperator(EOperator.Addition))

      expect( fpnToNumber( actualState.current )).eq(6)
      expect(actualState.operator).eq(EOperator.Addition)

      expect(actualState.temp1).not.eq(actualState.current)
      assert(actualState.temp1 !== null)
      expect( fpnToNumber( actualState.temp1 )).eq(6)
    })

    it('should start entering new number after operator input', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, addOperator(EOperator.Addition))
      actualState = memoryReducer(actualState, addDigit(5))

      assert(actualState.temp1 !== null)
      expect( fpnToNumber( actualState.temp1 )).eq(6)

      expect( fpnToNumber( actualState.current )).eq(5)
    })

    it('should switch operator when entering more than one operator in a row', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, addOperator(EOperator.Addition))
      actualState = memoryReducer(actualState, addOperator(EOperator.Subtraction))

      expect( fpnToNumber( actualState.current )).eq(6)
      expect(actualState.operator).eq(EOperator.Subtraction)

      expect(actualState.temp1).not.eq(actualState.current)
      assert(actualState.temp1 !== null)
      expect( fpnToNumber( actualState.temp1 )).eq(6)
    })

    it('should calculate after the operator input if there are two numbers entered already', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, addOperator(EOperator.Addition))
      actualState = memoryReducer(actualState, addDigit(5))
      actualState = memoryReducer(actualState, addOperator(EOperator.Subtraction))

      expect( fpnToNumber( actualState.current )).eq(11)
      expect(actualState.operator).eq(EOperator.Subtraction)

      expect(actualState.temp1).not.eq(actualState.current)
      assert(actualState.temp1 !== null)
      expect( fpnToNumber( actualState.temp1 )).eq(11)
    })

    it('should calculate only once after new operator input; afterwards it should only switch operators', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, addOperator(EOperator.Addition))
      actualState = memoryReducer(actualState, addDigit(5))
      actualState = memoryReducer(actualState, addOperator(EOperator.Multiplication))

      expect( fpnToNumber( actualState.current )).eq(11)
      expect(actualState.operator).eq(EOperator.Multiplication)

      expect(actualState.temp1).not.eq(actualState.current)
      assert(actualState.temp1 !== null)
      expect( fpnToNumber( actualState.temp1 )).eq(11)
    })
  })

  describe('Result calculation workflow', () => {
    it('should calculate the result', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, addOperator(EOperator.Addition))
      actualState = memoryReducer(actualState, addDigit(5))
      actualState = memoryReducer(actualState, calculateResult())

      expect( fpnToNumber( actualState.current )).eq(11)
      expect(actualState.operator).eq(EOperator.Addition)

      expect(actualState.temp1).not.eq(actualState.current)
      assert(actualState.temp1 !== null)
      expect( fpnToNumber( actualState.temp1 )).eq(6)

      expect(actualState.temp2).not.eq(actualState.current)
      assert(actualState.temp2 !== null)
      expect( fpnToNumber( actualState.temp2 )).eq(5)
    })

    it('should continue calculating the result with consequent pressing of the button', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, addOperator(EOperator.Addition))
      actualState = memoryReducer(actualState, addDigit(5))
      actualState = memoryReducer(actualState, calculateResult())
      actualState = memoryReducer(actualState, calculateResult())

      expect( fpnToNumber( actualState.current )).eq(16)
      expect(actualState.operator).eq(EOperator.Addition)

      expect(actualState.temp1).not.eq(actualState.current)
      assert(actualState.temp1 !== null)
      expect( fpnToNumber( actualState.temp1 )).eq(11)

      expect(actualState.temp2).not.eq(actualState.current)
      assert(actualState.temp2 !== null)
      expect( fpnToNumber( actualState.temp2 )).eq(5)
    })

    it("should duplicate operands if one isn't available", () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, addOperator(EOperator.Addition))
      actualState = memoryReducer(actualState, calculateResult())

      expect( fpnToNumber( actualState.current )).eq(12)
      expect(actualState.operator).eq(EOperator.Addition)

      expect(actualState.temp1).not.eq(actualState.current)
      assert(actualState.temp1 !== null)
      expect( fpnToNumber( actualState.temp1 )).eq(6)

      expect(actualState.temp2).not.eq(actualState.current)
      assert(actualState.temp2 !== null)
      expect( fpnToNumber( actualState.temp2 )).eq(6)
    })
  })
})