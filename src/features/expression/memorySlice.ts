import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calculate, EOperator } from '../mathCore'
import { CalculatorError } from '../CalculatorError'
import { addDigitToFPN, FloatingPointNumber, negateFPN, newFPN } from '../floatingPointNumber'

export interface TMemoryState {
  num: FloatingPointNumber,
  operator: EOperator | null,
  res: FloatingPointNumber,
  showResult: boolean,
  err: boolean
}

const initialState: TMemoryState = {
  num: newFPN(),
  operator: null,
  res: newFPN(),

  showResult: true,
  err: false
}

function makeTheCalculation(state: TMemoryState) {
  if (state.operator) {
    try {
      state.res = calculate(state.res, state.num, state.operator)
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
        state.num = newFPN()
        state.showResult = false;
      }
      state.num = addDigitToFPN(state.num, action.payload)
    },

    addOperator(state, action: PayloadAction<EOperator>) {
      if (state.operator) {
        makeTheCalculation(state)
      } else {
        state.res = state.num
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
        state.num = {...state.res}
      }

      state.num = negateFPN(state.num)
    },

    clearCurrentInput(state) {
      state.num = newFPN()
      state.showResult = true
    },

    clearAll() {
      return initialState
    }
  }
})

export const { addDigit, addOperator, calculateResult, toggleNegative, clearCurrentInput, clearAll } = memorySlice.actions

export default memorySlice.reducer