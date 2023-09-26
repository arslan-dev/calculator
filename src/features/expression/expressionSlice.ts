import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TExpressionState {
  numberA: number
}

const initialState: TExpressionState = {
  numberA: 6
}

const expressionSlice = createSlice({
  name: 'expression',
  initialState,
  reducers: {
    digitAdded(state, action: PayloadAction<number>) {
      state.numberA = state.numberA*10 + action.payload
    }
  }
})

export const { digitAdded } = expressionSlice.actions

export default expressionSlice.reducer