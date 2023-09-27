import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EOperator } from '../mathCore'

export interface TMemoryState {
  num: number,
  operator: EOperator | null,
  acc: number | null
}

const initialState: TMemoryState = {
  num: 6,
  operator: null,
  acc: null
}

const memorySlice = createSlice({
  name: 'memory',
  initialState,
  reducers: {
    addDigit(state, action: PayloadAction<number>) {
      state.num = state.num*10 + action.payload
    },
    addOperator(state, action: PayloadAction<EOperator>) {
      state.operator = action.payload
      console.log("operatorAdded: ", action.payload)
    }
  }
})

export const { addDigit, addOperator } = memorySlice.actions

export default memorySlice.reducer