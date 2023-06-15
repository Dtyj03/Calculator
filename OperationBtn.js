import { CALCULATE } from "./App"

export default function OperationBtn({ dispatch, operation }){
    return(
    <button onClick={() => dispatch({ type: CALCULATE.CHOOSE_OPERATION, payload :{ operation } })}>
        {operation}
        </button>
    )
}