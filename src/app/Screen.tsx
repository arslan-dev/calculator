import { useSelector } from "react-redux"
import type { RootState } from "./store"
import { fpnToNum } from "../features/floatingPointNumber"

// The Screen always displays current number
export const Screen = () => {
  const displayNumber = useSelector((state: RootState) => state.memory.current)
  const errorMessage = useSelector((state: RootState) => state.memory.errorMessage)

  const text = (errorMessage !== null) ? 'ERROR' : fpnToNum(displayNumber)
  return (<div className="screen"> { text } </div>)
}