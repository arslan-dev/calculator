import { useSelector } from "react-redux"
import type { RootState } from "./store"
import { fpnToNumber } from "../features/floatingPointNumber"
import { COperators } from "../features/mathCore"

export const MemoryView = () => {
  const operator = useSelector((state: RootState) => { return state.memory.operator ? COperators[state.memory.operator].symbol : null})
  const temporary = useSelector((state: RootState) => { return state.memory.temp1 })

  let debugString = ''
  if (temporary && operator) {
    debugString = `${fpnToNumber(temporary)} ${operator}`;
  }


  return (<div className="memory-view"> { debugString } </div>)
}