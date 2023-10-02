import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calculate, EOperator } from '../mathCore'
import { CalculatorError } from '../CalculatorError'
import { safelyConvertToFPNum } from '../floatingPointNumber'

export interface TMemoryState {
  num: number,
  operator: EOperator | null,
  acc: number,
  opBtnPressed: boolean,
  err: boolean
}

const initialState: TMemoryState = {
  num: 0,
  operator: null,
  acc: 0,

  opBtnPressed: true,
  err: false
}

function makeTheCalculation(state: TMemoryState) {
  if (state.operator) {
    try {
      state.acc = calculate(state.acc, state.num, state.operator)
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
      if (state.opBtnPressed) {
        state.num = 0
        state.opBtnPressed = false;
      }
      state.num = safelyConvertToFPNum( state.num*10 + action.payload )
    },

    addOperator(state, action: PayloadAction<EOperator>) {
      if (state.operator) {
        makeTheCalculation(state)
      } else {
        state.acc = state.num
      }

      state.operator = action.payload
      state.opBtnPressed = true
    },

    calculateResult(state) {
      if (state.operator) {
        makeTheCalculation(state)
        state.opBtnPressed = true
      }
    },

    toggleNegative(state) {
      if (state.opBtnPressed) {
        state.acc *= -1
      } else {
        state.num *= -1
      }
    },

    clearCurrentInput(state) {
      state.num = 0
      state.opBtnPressed = true
    },

    clearAll() {
      return initialState
    }
  }
})

export const { addDigit, addOperator, calculateResult, toggleNegative, clearCurrentInput, clearAll } = memorySlice.actions

export default memorySlice.reducer