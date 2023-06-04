import AnswerButtons from "../components/AnswerButtons/answerButtons";
import "./card5.css";
import { useState, useEffect } from "react";
import "../components/AnswerButtons/answerButtons.css";
import gV from "../../gV";



const Card5 = () => { 

  const [isShowInput, setİsShowInput] = useState(false);
 
  const [isSelect1, setIsSelect1] = useState(false);
  const [isSelect2, setIsSelect2] = useState(false);
  const [isSelect3, setIsSelect3] = useState(false);
  const [isSelect4, setIsSelect4] = useState(false);
  const [isSelect5, setIsSelect5] = useState(false);
  const [isSelect6, setIsSelect6] = useState(false);



  const findIndex = (catchText)=> {
    var carIndex = gV.doYouHave.indexOf(catchText);
    gV.doYouHave.splice(carIndex, 1);
   
  }

//ANSWER1
  useEffect(() => {
    if(isSelect1) {
      //add item
      gV.doYouHave.push("Family history of cancer.")
    }

    else {
      //remove item
      findIndex("Family history of cancer.")
    }
   
  } , [isSelect1]); 


//ANSWER2
  useEffect(() => {
    if(isSelect2) {
      //add item
      gV.doYouHave.push("Breast pain.")
    }

    else {
      //remove item
      findIndex("Breast pain.")
    }
   
  } , [isSelect2]); 


//ANSWER3
  useEffect(() => {
    if(isSelect3) {
      //add item
      gV.doYouHave.push("Palpable lump.")
    }

    else {
      //remove item
      findIndex("Palpable lump.")
    }
   
  } , [isSelect3]); 


//ANSWER4
  useEffect(() => {
    if(isSelect4) {
      //add item
      gV.doYouHave.push("Genetic mutation.")
    }

    else {
      //remove item
      findIndex("Genetic mutation.")
    }
  
  } , [isSelect4]); 


//ANSWER5
  useEffect(() => {
    if(isSelect5) {
      //add item
      gV.doYouHave.push("A gut feeling.")
    }

    else {
      //remove item
      findIndex("A gut feeling.")
    }
  
  } , [isSelect5]); 




const handleChange = (e) => {
gV.otherAnswer = e.target.value;

}



    return (
      <div className="card5">
        <div className="card5-main">
         
          <div className="card5-main-texts">
            <p>Do you have any of <span>these?</span></p>
            <p>You may choose multiple options, or you may add specific notes/feelings/symptoms while choosing other.</p>
          </div>

          <div className="card5-main-buttons">
            <AnswerButtons
            text={"Family history of cancer"}
            handleClick={() => { 
               setIsSelect1(!isSelect1);
            }}
            className={`${isSelect1 ? "answer-buttons-clicked" : "answer-buttons"}`}
            />
           
            <AnswerButtons
            text={"Breast pain"}
            handleClick={() => { 
              setIsSelect2(!isSelect2);
           }}
           className={`${isSelect2 ? "answer-buttons-clicked" : "answer-buttons"}`}
            />
           
            <AnswerButtons
            text={"Palpable lump"}
            handleClick={() => { 
              setIsSelect3(!isSelect3);
           }}
           className={`${isSelect3 ? "answer-buttons-clicked" : "answer-buttons"}`}
            />
           
            <AnswerButtons
            text={"Genetic mutation"}
            handleClick={() => { 
              setIsSelect4(!isSelect4);
           }}
           className={`${isSelect4 ? "answer-buttons-clicked" : "answer-buttons"}`}
            />
           
            <AnswerButtons
            text={"A gut feeling"}
            handleClick={() => { 
              setIsSelect5(!isSelect5);
           }}
           className={`${isSelect5 ? "answer-buttons-clicked" : "answer-buttons"}`}
            />
           
            <AnswerButtons
            text={"Other"}
            handleClick={() => { 
               
                isSelect6 ? window.scrollTo(0, 0) : window.scrollTo(0, 100) 
              
              setIsSelect6(!isSelect6);
              setİsShowInput(!isShowInput);
              gV.isUserClickOtherAnswer = true;
           }}
           className={`${isSelect6 ? "answer-buttons-clicked" : "answer-buttons"}`}
            />
           
          </div>

        { isShowInput && <input onChange={handleChange} placeholder="Specify other..." className="nameİnput"/>}


        </div>
      </div>
    );

}

export default Card5;