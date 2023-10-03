import { useSelector } from "react-redux"
import type { RootState } from "./store"
import { fpnToNumber } from "../features/floatingPointNumber"

// The Screen always displays current number
export const Screen = () => {
  const displayNumber = useSelector((state: RootState) => state.memory.current)
  return (<div className="screen"> { fpnToNumber(displayNumber) } </div>)
}