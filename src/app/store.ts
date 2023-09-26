import { configureStore } from "@reduxjs/toolkit";
import expressionReducer from "../features/expression/expressionSlice"

export const store = configureStore({
  reducer: {
    expression: expressionReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch