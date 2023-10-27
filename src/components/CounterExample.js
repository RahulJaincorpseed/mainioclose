import React, { createContext, useContext } from "react"  
import { useDispatch, useSelector } from "react-redux"
import { Decrement, Increment, UserSetData } from "../Redux/Action/CounterAction"
import { useEffect } from "react"

const CounterExample = () => {
  const counterValue = useSelector((state) => state.counterReducer)
  const userValue = useSelector((state) => (state.UserDataReducer.userData))

  const dispatch = useDispatch()
  // console.log(counterValue)
  console.log(userValue);
  let currentUser = userValue;

  const data = {
    name: "Rahul",
    email: "rahul.jain@corpseed.com"
  }

  let current = {};
 

  
  
  // useEffect(()=>{
  //   // dispatch(UserSetData(currentUser))
  //   // window.onunload = () =>{
  //   //   console.log("before loads")
  //   //   const data2 =  dispatch(UserSetData(current))
  //   //   console.log(data2);
  //   // }
  //   // window.addEventListener("load", () =>{
  //     // dispatch(UserSetData(data2))
  //   })
  // },[])
  
  
  
  // const userContext = useContext();

  // console.log(userContext);
  
  const setDataFun = () => {
    dispatch(UserSetData(data))
   
  } 
  console.log("i am current", current);
  
  
  
  return (
    <div>
      <button
        onClick={() => dispatch(Increment(1))}
        className="btn btn-primary"
      >
        Increment
      </button>
      <h1>{counterValue}</h1>
      <button
        onClick={() => dispatch(Decrement(1))}
        className="btn btn-primary"
      >
        Decrement
      </button>


      <button onClick={setDataFun} className="btn btn-primary">
        Set User Data
      </button>
    </div>
  )
}

export default CounterExample
