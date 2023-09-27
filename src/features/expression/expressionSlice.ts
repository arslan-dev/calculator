import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EOperator } from '../mathCore'

export interface TExpressionState {
  numberA: number,
  operator: EOperator | null,
  numberB: number | null
}

const initialState: TExpressionState = {
  numberA: 6,
  operator: null,
  numberB: null
}

const expressionSlice = createSlice({
  name: 'expression',
  initialState,
  reducers: {
    digitAdded(state, action: PayloadAction<number>) {
      state.numberA = state.numberA*10 + action.payload
    },
    operatorAdded(state, action: PayloadAction<EOperator>) {
      state.operator = action.payload
      console.log("operatorAdded: ", action.payload)
    }
  }
})

export const { digitAdded, operatorAdded } = expressionSlice.actions

export default expressionSlice.reducer