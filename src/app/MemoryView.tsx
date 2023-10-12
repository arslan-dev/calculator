import { useSelector } from "react-redux"
import type { RootState } from "./store"
import { fpnToNum } from "../features/floatingPointNumberUtils"
import { COperators } from "../features/mathCore"

export const MemoryView = () => {
  const operator = useSelector((state: RootState) => { return state.memory.operator ? COperators[state.memory.operator].symbol : null})
  const temp1 = useSelector((state: RootState) => { return state.memory.temp1 })

  const temp2 = useSelector((state: RootState) => { return state.memory.temp2 })

  let debugString = ''
  if (temp1 && operator) {
    debugString = `${fpnToNum(temp1)} ${operator}`;

    if (temp2) {
      debugString += ` ${fpnToNum(temp2)} =`
    }
  }


  return (<div className="memory-view"> { debugString } </div>)
}