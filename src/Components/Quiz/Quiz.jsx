import React, { useEffect, useRef, useState } from 'react'
import './Quiz.css'
import {data} from '../../assets/data'

const Quiz = () => {

  let [index,setIndex] = useState(0);
  let [lock,setLock] = useState(false);
  let [score,setScore] = useState(0);
  let [result,setResult] = useState(false);
  let [timeLeft,setTimeLeft] = useState(20);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1,Option2,Option3,Option4];

//timer logic
useEffect(()=>{
    if (timeLeft===0) {
        next();
        return;
    }
    const timer =  setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);

},[timeLeft])

  const checkAns = (e, ans) => {
    if(lock === false){
        if(data[index].ans === ans){
            e.target.classList.add("correct");
            setScore(prev=>prev+1);
            setLock(true);
        }
        else{
            e.target.classList.add("wrong");
            option_array[data[index].ans-1].current.classList.add("correct");
            setLock(true);
        }
    }
  }

  const next = ()=>{
    if(lock || timeLeft===0){  
      if(index === data.length -1){
        setResult(true);
        return ;
      }
        
    setIndex((prev)=>prev+1);
    setLock(false);
    setTimeLeft(20);

    option_array.forEach((option)=>{
        option.current.classList.remove("wrong", "correct");
        

    });
    
  }
  };

  const reset = () =>{
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
    setTimeLeft(20);

    option_array.forEach((option)=>{
        option.current.classList.remove("wrong", "correct");
        

    });

    
  }

  return (
    <div className='container'>
    <h1>Quiz App</h1>
    <hr />
    {result?<></>:<> 
    <h2>{index+1}. {data[index].question}</h2>
    <div className='timer'>{timeLeft} seconds left</div>
    <ul>
        <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{data[index].option1}</li>
        <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{data[index].option2}</li>
        <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{data[index].option3}</li>
        <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{data[index].option4}</li>
    </ul>
    <button onClick={next}>Next</button>
    <div className='index'>{index+1} of {data.length} questions</div>
     </>}
     {result?<>
        <h2>Your Score {score} out of {data.length}</h2>
        <button onClick={reset}>Reset</button>
     </>:<></>}
   
    </div>
  )
}

export default Quiz