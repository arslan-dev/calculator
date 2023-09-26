export interface TDigitButtonProps {
  digit: number
  onClick: (a: number) => () => void
}

export const DigitButton = (props: TDigitButtonProps) => {
  return <button
    type="button"
    className="btn btn-light border border-secondary"
    onClick={props.onClick(7)}
  >
    { props.digit }
  </button>
}