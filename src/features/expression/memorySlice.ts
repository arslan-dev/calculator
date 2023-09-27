import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calculate, CalculationError, EOperator } from '../mathCore'

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
      state.num = state.num*10 + action.payload
    },

    addOperator(state, action: PayloadAction<EOperator>) {
      state.operator = action.payload
      state.opBtnPressed = true

      if (!state.acc) {
        state.acc = state.num
      } else {
        const res = calculate(state.acc, state.num, action.payload)

        if (res != CalculationError) {
          state.acc = res
        } else {
          state.err = true
        }
      }
    },

    clearCurrentInput(state) {
      state.num = 0
      state.opBtnPressed = true
    }
  }
})

export const { addDigit, addOperator, clearCurrentInput } = memorySlice.actions

export default memorySlice.reducer