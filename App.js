import React, { useReducer } from 'react';
import DigitBtn from './DigitBtn';
import OperationBtn from './OperationBtn';
import './style.css';

export const CALCULATE = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  PLUS: '+',
  DELETE_DIGIT:'delete-digit',
  EVALUATE: 'evaluate',
}

function reducer(state,{ type, payload}){
  switch(type) {
    case CALCULATE.ADD_DIGIT:
      if (state.overwrite){
        return {
          ...state,
          currentoutput: payload.digit,
          overwrite :false,
        }
      }
      if (payload.digit === "0" && state.currentoutput === "0") { 
        return state
       }
        if (payload.digit === "." && state.currentoutput.includes (".")){
      return state 
        }
      return{
        ...state,
        currentoutput: `${state.currentoutput || ""}${payload.digit}`
       }
      case CALCULATE.CHOOSE_OPERATION:
        if (state.currentoutput == null && state.prevoutput == null ){
          return state
        }
        if (state.currentoutput == null){
          return{
            ...state,
            operation: payload.operation,
          }
        }

        if (state.prevoutput == null ){
          return {
            ...state,
            operation: payload.operation,
            prevoutput: state.currentoutput,
            currentoutput: null,
          }
        }
      return{
        ...state,
        prevoutput: evaluate(state),
        operation: payload.operation,
        currentoutput: null
      }
      case CALCULATE.CLEAR:
    return{}

      case CALCULATE.DELETE_DIGIT:
        if (state.overwrite){
          return{
            ...state,
            overwrite: false,
            currentoutput: null
          }
        }
        if (state.currentoutput == null) return state
        if (state.currentoutput.length === 1) {
          return {... state, currentoutput: null}
        }

        return{ 
          ...state,
          currentoutput: state.currentoutput.slice (0,-1)
        }
    case CALCULATE.EVALUATE:
      if(state.operation == null || state.currentoutput == null || state.prevoutput == null){
        return state
      }

      return{
        ...state,
        prevoutput: null,
        operation: null,
        currentoutput: evaluate (state),
      }
}
}

function evaluate({ currentoutput, prevoutput, operation}){
  const prev = parseFloat(prevoutput)
  const current = parseFloat (currentoutput)
  if (isNaN(prev) || isNaN (current)) return ""
  let computation = ""
  switch (operation){
    case "+" :
      computation = prev + current
      break
    case "-" :
      computation = prev - current
      break
    case "*" :
      computation = prev * current
      break
    case "÷" :
      computation = prev / current
      break  

  }

  return computation.toString()
}

const INTEGER_FORMAT = new Intl.NumberFormat("en-us",{
  maximumFractionDigits: 0,
})

function formatOutput(output){
  if (output == null) return
  const [ integer, decimal ] = output.split('.')
  if (decimal == null) return INTEGER_FORMAT.format(integer)
  return `${INTEGER_FORMAT.format(integer)}.${decimal}`
}
function App() {
  const [{ prevoutput, currentoutput, operation }, dispatch]= useReducer(
    reducer,{})

  return (
    <div className="header"><h1>Calculator</h1>
    <div className="calc-grid">
      <div className="output">
        <div className="prev-output">{formatOutput(prevoutput)}{operation}</div>
        <div className="current-output">{formatOutput(currentoutput)}</div>
      </div>
     <button className="span-two" onClick={() => dispatch({type: CALCULATE.CLEAR})}>Clear</button>
     <button onClick={() => dispatch({type: CALCULATE.DELETE_DIGIT})}>DEL</button>
      <OperationBtn operation= "÷" dispatch={dispatch}/> 
      <DigitBtn digit= "1" dispatch={dispatch}/> 
      <DigitBtn digit= "2" dispatch={dispatch}/> 
      <DigitBtn digit= "3" dispatch={dispatch}/> 
      <OperationBtn operation= "*" dispatch={dispatch}/> 
      <DigitBtn digit= "4" dispatch={dispatch}/> 
      <DigitBtn digit= "5" dispatch={dispatch}/> 
      <DigitBtn digit= "6" dispatch={dispatch}/> 
      <OperationBtn operation= "-" dispatch={dispatch}/> 
      <DigitBtn digit= "7" dispatch={dispatch}/> 
      <DigitBtn digit= "8" dispatch={dispatch}/> 
      <DigitBtn digit= "9" dispatch={dispatch}/> 
      <OperationBtn operation= "+" dispatch={dispatch} className="row-two"></OperationBtn>
      <DigitBtn digit= "." dispatch={dispatch}/> 
      <DigitBtn digit= "0" dispatch={dispatch}/> 
      <button className="span-two" onClick={() => dispatch({type: CALCULATE.EVALUATE})}>=</button>


    </div>
    </div>
  );
}

export default App;
