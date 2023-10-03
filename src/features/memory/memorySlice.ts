import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calculate, EOperator } from '../mathCore'
import { CalculatorError } from '../CalculatorError'
import { addDigitToFPN, copyFPN, FloatingPointNumber, negateFPN, newFPN } from '../floatingPointNumber'

export enum EInputMode { Digit, Operator, Result }

export interface TMemoryState {
  current: FloatingPointNumber,
  temp1: FloatingPointNumber | null,
  temp2: FloatingPointNumber | null,

  operator: EOperator | null,
  inputMode: EInputMode,
  errorMessage?: string | null
}

export function getInitialState(): TMemoryState {
  return {
    current: newFPN(),
    temp1: null, // used when entering second number to temporary store the first number
    temp2: null, // used when showing the result to temporary store the second number

    operator: null,
    inputMode: EInputMode.Digit,
    errorMessage: null
  }
}

// function itIsTheFirstPhase(state: TMemoryState): boolean { return state.operator === null }
// function itIsTheSecondPhase(state: TMemoryState): boolean { return state.operator !== null && state.temporary === null }
// function itIsTheThirdPhase(state: TMemoryState): boolean { return state.operator !== null && state.temporary === null }

const initialState = getInitialState()

const memorySlice = createSlice({
  name: 'memory',
  initialState,
  reducers: {

    addDigit(state, action: PayloadAction<number>) {

      // let newState: TMemoryState
      // if (!state.newDigitEntered) {
      //   newState = {...state, ...initialState}
      // } else {
      //   newState = {...state}
      // }

      let newState: TMemoryState = {...state}
      switch (state.inputMode) {
        case EInputMode.Result: newState = getInitialState(); break;
        case EInputMode.Operator: newState.current = newFPN(); break;
      }
      newState.current = addDigitToFPN(newState.current, action.payload)
      newState.inputMode = EInputMode.Digit
      
      return newState
    },

    addOperator(state, action: PayloadAction<EOperator>) {
      if (state.operator && state.temp2 === null) {
        if (state.temp1 && state.inputMode === EInputMode.Digit) {
          try {
            state.current = calculate(state.temp1, state.current, state.operator)
          } catch (e) {
            if (e instanceof CalculatorError) {
              state.errorMessage = e.message
            }
          }
        }
      }

      state.operator = action.payload
      state.temp1 = copyFPN(state.current)
      state.temp2 = null
      state.inputMode = EInputMode.Operator
    },

    calculateResult(state) {
      if (state.temp1 !== null && state.operator) {
        if (state.temp2 === null) { // if we're calculating for the first time
          state.temp2 = copyFPN(state.current)
        } else {
          state.temp1 = copyFPN(state.current)
        }

        try {
          state.current = calculate(state.temp1, state.temp2, state.operator)
        } catch (e) {
          if (e instanceof CalculatorError) {
            state.errorMessage = e.message
          }
        }

        state.inputMode = EInputMode.Result
      }
    },

    toggleNegative(state) {
      state.current = negateFPN(state.current)
    },

    clearCurrentInput(state) {
      state.current = newFPN()
    },

    clearAll() {
      return getInitialState()
    }
  }
})

export const { addDigit, addOperator, calculateResult, toggleNegative, clearCurrentInput, clearAll } = memorySlice.actions

export default memorySlice.reducer