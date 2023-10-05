import { assert, describe, expect, it } from "vitest";
import memoryReducer, { addDigit, selectOperator, calculateResult, clearAll, clearCurrentOperand, getInitialState } from "../features/memory/memorySlice";
import { fpnToNumber } from "../features/floatingPointNumber";
import { EOperator } from "../features/mathCore";

const mockInitialState = getInitialState()

describe('Calculator workflow', () => {
  describe('Initialization', () => {
    it('should return the initial slice', () => {
      expect(memoryReducer(undefined, {type: undefined})).toEqual(mockInitialState)
    })
  })

  describe('Adding digits', () => {

    it('should add digits to the current operand', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(1))
      actualState = memoryReducer(actualState, addDigit(2))
      actualState = memoryReducer(actualState, addDigit(3))

      expect( fpnToNumber(actualState.current) ).eq(123)
    })

    it('should add digits to the current operand after the operator selection', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, selectOperator(EOperator.Addition))
      actualState = memoryReducer(actualState, addDigit(5))

      assert(actualState.temp1 !== null)
      expect( fpnToNumber( actualState.temp1 )).eq(6)

      expect( fpnToNumber( actualState.current )).eq(5)
    })

    it('should start a new cycle and add digits to the first operand after calculating the result', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, selectOperator(EOperator.Addition))
      actualState = memoryReducer(actualState, addDigit(5))
      actualState = memoryReducer(actualState, calculateResult())
      actualState = memoryReducer(actualState, addDigit(4))

      expect( fpnToNumber( actualState.current )).eq(4)
      expect(actualState.operator).null
      expect(actualState.temp1).null
      expect(actualState.temp2).null
    })
  })

  describe('Operator workflow', () => {

    it('should save the operator and copy the current operand to temp1 register', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, selectOperator(EOperator.Addition))

      expect( fpnToNumber( actualState.current )).eq(6)
      expect(actualState.operator).eq(EOperator.Addition)

      expect(actualState.temp1).not.eq(actualState.current)
      assert(actualState.temp1 !== null)
      expect( fpnToNumber( actualState.temp1 )).eq(6)
    })

    it('should only switch operators when inputting more than one operator in a row', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, selectOperator(EOperator.Addition))
      actualState = memoryReducer(actualState, selectOperator(EOperator.Subtraction))

      expect( fpnToNumber( actualState.current )).eq(6)
      expect(actualState.operator).eq(EOperator.Subtraction)

      expect(actualState.temp1).not.eq(actualState.current)
      assert(actualState.temp1 !== null)
      expect( fpnToNumber( actualState.temp1 )).eq(6)
    })

    it('should calculate after the operator input if there are two operands entered already', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, selectOperator(EOperator.Addition))
      actualState = memoryReducer(actualState, addDigit(5))
      actualState = memoryReducer(actualState, selectOperator(EOperator.Subtraction))

      expect( fpnToNumber( actualState.current )).eq(11)
      expect(actualState.operator).eq(EOperator.Subtraction)

      expect(actualState.temp1).not.eq(actualState.current)
      assert(actualState.temp1 !== null)
      expect( fpnToNumber( actualState.temp1 )).eq(11)
    })

    it('should calculate only once after new operator input; afterwards it should only switch operators', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, selectOperator(EOperator.Addition))
      actualState = memoryReducer(actualState, addDigit(5))
      actualState = memoryReducer(actualState, selectOperator(EOperator.Multiplication))

      expect( fpnToNumber( actualState.current )).eq(11)
      expect(actualState.operator).eq(EOperator.Multiplication)

      expect(actualState.temp1).not.eq(actualState.current)
      assert(actualState.temp1 !== null)
      expect( fpnToNumber( actualState.temp1 )).eq(11)
    })

    it('should not calculate more results (just switch operators) after entering new operator after result calculation', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, selectOperator(EOperator.Addition))
      actualState = memoryReducer(actualState, addDigit(5))
      actualState = memoryReducer(actualState, calculateResult())
      actualState = memoryReducer(actualState, selectOperator(EOperator.Subtraction))

      expect( fpnToNumber( actualState.current )).eq(11)
      expect(actualState.operator).eq(EOperator.Subtraction)

      expect(actualState.temp1).not.eq(actualState.current)
      assert(actualState.temp1 !== null)
      expect( fpnToNumber( actualState.temp1 )).eq(11)

      expect(actualState.temp2).null
    })
  })

  describe('Result calculation workflow', () => {
    it('should calculate the result', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, selectOperator(EOperator.Addition))
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

    it('should continue calculating new results', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, selectOperator(EOperator.Addition))
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
      actualState = memoryReducer(actualState, selectOperator(EOperator.Addition))
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

  describe('Operator after result calculation', () => {
  })

  describe('Clear all (AC)', () => {
    it('should clear all', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, selectOperator(EOperator.Addition))
      actualState = memoryReducer(actualState, addDigit(5))
      actualState = memoryReducer(actualState, calculateResult())
      actualState = memoryReducer(actualState, clearAll())

      expect(actualState).toEqual(mockInitialState)
    })
  })

  describe("Clear current operand (C)", () => {
    it('should clear the current operand during the first operand input', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(1))
      actualState = memoryReducer(actualState, clearCurrentOperand())

      expect( fpnToNumber(actualState.current) ).eq(0)
    })

    it('should clear the current operand during the second operator input', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(1))
      actualState = memoryReducer(actualState, selectOperator(EOperator.Addition))
      actualState = memoryReducer(actualState, addDigit(2))
      actualState = memoryReducer(actualState, clearCurrentOperand())

      assert(actualState.temp1 !== null)
      expect( fpnToNumber( actualState.temp1 )).eq(1)

      expect( fpnToNumber(actualState.current) ).eq(0)
    })

    it('should start a new cycle after calculating the result', () => {
      let actualState = memoryReducer(undefined, {type: undefined})
      actualState = memoryReducer(actualState, addDigit(6))
      actualState = memoryReducer(actualState, selectOperator(EOperator.Addition))
      actualState = memoryReducer(actualState, addDigit(5))
      actualState = memoryReducer(actualState, calculateResult())
      actualState = memoryReducer(actualState, clearCurrentOperand())

      expect( fpnToNumber( actualState.current )).eq(0)
      expect(actualState.operator).null
      expect(actualState.temp1).null
      expect(actualState.temp2).null
    })
  })
})