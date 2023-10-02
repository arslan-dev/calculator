import { useSelector } from "react-redux"
import type { RootState } from "./store"
import { fpnToNumber } from "../features/floatingPointNumber"

export const MemoryView = () => {
  const displayNumber = useSelector((state: RootState) => {
    if (state.memory.showResult) {
      return state.memory.b
    } else {
      return state.memory.a
    }
  })

  return (<div className="memory-view"> { fpnToNumber(displayNumber) } </div>)
}