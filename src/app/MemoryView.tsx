import { useSelector } from "react-redux"
import type { RootState } from "./store"
import { fpnToNumber } from "../features/floatingPointNumber"

export const MemoryView = () => {
  const displayNumber = useSelector((state: RootState) => {
    if (state.memory.showResult) {
      return state.memory.res
    } else {
      return state.memory.num
    }
  })

  return (<div className="memory-view"> { fpnToNumber(displayNumber) } </div>)
}