import "./card1.css"
import gV from "../../gV.js";

import React from 'react';
import { setGlobalState, useGlobalState } from "../../hookState";

const Card1 = ({animation}) => {
  
  const [isError] = useGlobalState("isError");


return (

    
    <div className={`card1 ${animation}`}>
      <div className="card1-main">
       
       <div className="card1-main-texts">
         <p> Hello there!</p>
         <p> It will take only 3 minutes to complete this form, and we promise the recheck will be worth your time. Let's get to know each other. My name is Jessica, and I am a board-certified radiologist specializing in breast cancer diagnosis.</p>
         <p> <span > What is your name? </span></p>
       </div>
    
       <p className="card1-main-texts-text">Please enter you full name.</p>
     


        <input placeholder="Type your name here."  className="nameİnput" type="text" name="name" id="name"
       
        onChange={(e) => {
          //scroll bottom
         
           gV.userName = e.target.value;

            if (e.target.value.length > 0) {
              setGlobalState("isFormValidate", true);
            } else {
              setGlobalState("isFormValidate", false);
            }

        
       
        }}
        
        />

        <p className= {isError ? "is-error-text" : "display-none" }> This question is required</p>


    </div>
    </div>


)

}

export default Card1;

