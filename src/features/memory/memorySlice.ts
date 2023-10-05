import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calculate, EOperator } from '../mathCore'
import { CalculatorError } from '../CalculatorError'
import { addDigitToFPN, copyFPN, FloatingPointNumber, negateFPN, newFPN } from '../floatingPointNumber'

export enum EInputMode { Digit, Operator, Result }
export enum EDigitInputMode { Integer, Decimal }

export interface TMemoryState {
  current: FloatingPointNumber,
  temp1: FloatingPointNumber | null,
  temp2: FloatingPointNumber | null,
  operator: EOperator | null,

  inputMode: EInputMode,
  digitInputMode: EDigitInputMode,
  errorMessage?: string | null
}

export function getInitialState(): TMemoryState {
  return {
    current: newFPN(),
    temp1: null, // used when entering second number to temporary store the first number
    temp2: null, // used when showing the result to temporary store the second number
    operator: null,

    inputMode: EInputMode.Digit,
    digitInputMode: EDigitInputMode.Integer,
    errorMessage: null
  }
}

const initialState = getInitialState()

function setCurrentToZero(state: TMemoryState) {
  state.current = newFPN();
  state.digitInputMode = EDigitInputMode.Integer
}

const memorySlice = createSlice({
  name: 'memory',
  initialState,
  reducers: {

    addDigit(state, action: PayloadAction<number>) {
      let newState: TMemoryState = {...state}
      switch (state.inputMode) {
        case EInputMode.Result: newState = getInitialState(); break;
        case EInputMode.Operator: setCurrentToZero(newState); break;
      }
      newState.current = addDigitToFPN(newState.current, action.payload, newState.digitInputMode===EDigitInputMode.Decimal)
      newState.inputMode = EInputMode.Digit
      
      return newState
    },

    selectOperator(state, action: PayloadAction<EOperator>) {
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

    toggleSign(state) {
      if (state.inputMode === EInputMode.Result) {
        const negatedCurrent = negateFPN(state.current)
        const newState = getInitialState();
        newState.current = negatedCurrent
        return newState;
      }
      state.current = negateFPN(state.current)
    },

    addPoint(state) {
      state.digitInputMode = EDigitInputMode.Decimal 
    },

    clearCurrentOperand(state) {
      if (state.inputMode === EInputMode.Result) {
        return getInitialState();
      }
      setCurrentToZero(state)
    },

    clearAll() {
      return getInitialState()
    }
  }
})

export const { addDigit, selectOperator, calculateResult, toggleSign, clearCurrentOperand, clearAll, addPoint } = memorySlice.actions

export default memorySlice.reducer