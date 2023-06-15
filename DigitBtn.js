import { CALCULATE } from "./App"

export default function DigitBtn({ dispatch, digit}){
    return(
    <button onClick={() => dispatch({ type: CALCULATE.ADD_DIGIT, payload :{ digit } })}>
        {digit}
        </button>
    )
}