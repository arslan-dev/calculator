import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calculate, EOperator } from '../mathCore'
import { CalculatorError } from '../CalculatorError'
import { addDigitToFPN, FloatingPointNumber, negateFPN, newFPN } from '../floatingPointNumber'

export interface TMemoryState {
  a: FloatingPointNumber,
  operator: EOperator | null,
  b: FloatingPointNumber,
  showResult: boolean,
  err: boolean
}

const initialState: TMemoryState = {
  a: newFPN(),
  operator: null,
  b: newFPN(),

  showResult: true,
  err: false
}

function makeTheCalculation(state: TMemoryState) {
  if (state.operator) {
    try {
      state.b = calculate(state.b, state.a, state.operator)
    } catch (e) {
      if (e instanceof CalculatorError) {
        state.err = true
      }
    }
  }
}

const memorySlice = createSlice({
  name: 'memory',
  initialState,
  reducers: {

    addDigit(state, action: PayloadAction<number>) {
      // If digit added immediately after the operator button pressed - start entering new number
      if (state.showResult) {
        state.a = newFPN()
        state.showResult = false;
      }
      state.a = addDigitToFPN(state.a, action.payload)
    },

    addOperator(state, action: PayloadAction<EOperator>) {
      if (state.operator) {
        makeTheCalculation(state)
      } else {
        state.b = state.a
      }

      state.operator = action.payload
      state.showResult = true
    },

    calculateResult(state) {
      if (state.operator) {
        makeTheCalculation(state)
        state.showResult = true
      }
    },

    toggleNegative(state) {
      if (state.showResult) {
        state.a = {...state.b}
      }

      state.a = negateFPN(state.a)
    },

    clearCurrentInput(state) {
      state.a = newFPN()
      state.showResult = true
    },

    clearAll() {
      return initialState
    }
  }
})

export const { addDigit, addOperator, calculateResult, toggleNegative, clearCurrentInput, clearAll } = memorySlice.actions

export default memorySlice.reducer