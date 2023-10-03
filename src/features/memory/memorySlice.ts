import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calculate, EOperator } from '../mathCore'
import { CalculatorError } from '../CalculatorError'
import { addDigitToFPN, copyFPN, FloatingPointNumber, negateFPN, newFPN } from '../floatingPointNumber'

export interface TMemoryState {
  current: FloatingPointNumber,
  temp1: FloatingPointNumber | null,
  temp2: FloatingPointNumber | null,

  operator: EOperator | null,
  errorMessage?: string | null
}

const initialState: TMemoryState = {
  current: newFPN(),
  temp1: null, // used when entering second number to temporary store the first number
  temp2: null, // used when showing the result to temporary store the second number

  operator: null,
  errorMessage: null
}

// function itIsTheFirstPhase(state: TMemoryState): boolean { return state.operator === null }
// function itIsTheSecondPhase(state: TMemoryState): boolean { return state.operator !== null && state.temporary === null }
// function itIsTheThirdPhase(state: TMemoryState): boolean { return state.operator !== null && state.temporary === null }

const memorySlice = createSlice({
  name: 'memory',
  initialState,
  reducers: {

    addDigit(state, action: PayloadAction<number>) {
      // If digit added immediately after the operator button pressed - start entering new number
      if (state.temp2) {
        state.current = newFPN()
        state.temp2 = null;
      }
      state.current = addDigitToFPN(state.current, action.payload)
    },

    addOperator(state, action: PayloadAction<EOperator>) {
      if (state.operator) {
        if (state.temp1 && state.current) {
          try {
            state.temp1 = calculate(state.temp1, state.current, state.operator)
          } catch (e) {
            if (e instanceof CalculatorError) {
              state.errorMessage = e.message
            }
          }
        }
      } else if (state.current) {
        state.temp1 = state.current
        state.current = newFPN(0)
      }

      state.operator = action.payload
    },

    calculateResult(state) {
      if (state.operator) {
        if (!state.temp1) {
          state.temp1 = copyFPN(state.current)
        }

        state.temp2 = copyFPN(state.current)

        try {
          state.current = calculate(state.temp1, state.temp2, state.operator)
        } catch (e) {
          if (e instanceof CalculatorError) {
            state.errorMessage = e.message
          }
        }
      }
    },

    toggleNegative(state) {
      state.current = negateFPN(state.current)
    },

    clearCurrentInput(state) {
      state.current = newFPN()
    },

    clearAll() {
      return initialState
    }
  }
})

export const { addDigit, addOperator, calculateResult, toggleNegative, clearCurrentInput, clearAll } = memorySlice.actions

export default memorySlice.reducer