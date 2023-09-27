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
  name: 'expression',
  initialState,
  reducers: {
    digitAdded(state, action: PayloadAction<number>) {
      state.num = state.num*10 + action.payload
    },
    operatorAdded(state, action: PayloadAction<EOperator>) {
      state.operator = action.payload
      console.log("operatorAdded: ", action.payload)
    }
  }
})

export const { digitAdded, operatorAdded } = memorySlice.actions

export default memorySlice.reducer