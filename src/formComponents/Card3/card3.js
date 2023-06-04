import AnswerButtons from "../components/AnswerButtons/answerButtons";
import "./card3.css";
import { useEffect, useState } from "react";
import gV from "../../gV";
import { setGlobalState, useGlobalState } from "../../hookState";
import { getAuth } from "firebase/auth";
const Card3 = () => { 

  const [isSelect1, setIsSelect1] = useState(false);
  const [isSelect2, setIsSelect2] = useState(false);
  const [isSelect3, setIsSelect3] = useState(false);
  const [isSelect4, setIsSelect4] = useState(false);
  const [isError] = useGlobalState("isError");

  const [userName] = useGlobalState("userName");

  const auth = getAuth();
  const user = auth.currentUser;
 


  const findIndex = (catchText, catchText2)=> {
    var carIndex = gV.appliestTo.indexOf(catchText);
    gV.appliestTo.splice(carIndex, 1);
   
  }

  const findIndex2 = (catchText)=> {
    var carIndex = gV.showAppliesText.indexOf(catchText);
    gV.showAppliesText.splice(carIndex, 1);


  }


  useEffect(() => {
   

   //transform array to string
    var showAppliesText = gV.showAppliesText.toString();


  }, [isSelect1, isSelect2, isSelect3, isSelect4]);
  
  useEffect(() => {
    if(isSelect1) {
      gV.appliestTo.push("I got a mammogram screening.")
      gV.showAppliesText.push(" Mammogram")
    
    }
  
      else {
        findIndex("I got a mammogram screening.")  
        findIndex2(" Mammogram")  
      
      }
            
      } , [isSelect1]); 
   


  useEffect(() => {
    if(isSelect2) {
      gV.appliestTo.push("I got a ultrasound screening.")
      gV.showAppliesText.push(" Ultrasound")
    }

    else {
      findIndex("I got a ultrasound screening.")
      findIndex2(" Ultrasound")  

    }
   
  } , [isSelect2]); 



  useEffect(() => {
    if(isSelect3) {
      gV.appliestTo.push("I got a breast MRI.")
      gV.showAppliesText.push(" Breast MRI")


    }

    else {
      findIndex("I got a breast MRI.")
      findIndex2(" Breast MRI")
    }
  
  } , [isSelect3]); 



  useEffect(() => {
    if(isSelect4) {
      gV.appliestTo.push("I had a biopsy.")
      gV.showAppliesText.push(" Biopsy")

    }

    else {
      findIndex("I had a biopsy.")
      findIndex2(" Biopsy")
    }
   
  } , [isSelect4]); 

 

    return (
      <div className="card3">
        <div className="card3-main mt-5 lg:mt-0">

        { user &&   <p className="font-product tracking-wide text-[19px] text-[#142b6f] font-bold">Welcome back, {userName.split(" ")[0]}</p>}
        
          <div className="card3-main-texts">
            <p>Which of the following applies to you?</p>
            <p>You may choose more than one.</p>
          </div>

          <div className="card3-main-buttons">
            <AnswerButtons
            text={"I got a mammogram screening."}
            handleClick={() => { 
              setIsSelect1(!isSelect1);
              setGlobalState("isFormValidate", true);
                 
          
           
           }}
           className={`${isSelect1 ? "answer-buttons-clicked" : "answer-buttons"}`}
            />
           
            <AnswerButtons
            text={"I got an ultrasound screening."}
            handleClick={() => { 
              setIsSelect2(!isSelect2);
              setGlobalState("isFormValidate", true);
           
            
           }}
           className={`${isSelect2 ? "answer-buttons-clicked" : "answer-buttons"}`}
            />
           
            <AnswerButtons
            text={"I got a breast MRI."}
            handleClick={() => { 
              setIsSelect3(!isSelect3);
              setGlobalState("isFormValidate", true);
             
          
           }}
           className={`${isSelect3 ? "answer-buttons-clicked" : "answer-buttons"}`}
            />
           
            <AnswerButtons
            text={"I had a biopsy."}
            handleClick={() => { 
              setIsSelect4(!isSelect4);
              setGlobalState("isFormValidate", true);
             
          
           }}
           className={`${isSelect4 ? "answer-buttons-clicked" : "answer-buttons"}`}
            />
           
          </div>
          <p style={{marginLeft:"12px"}} className= {isError ? "is-error-text" : "display-none" }> This question is required</p>


        </div>
      </div>
    );

}

export default Card3;