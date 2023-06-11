import "./cardHaveInsurance.css";
import { useState } from "react";
import gV from "../../gV";
import { setGlobalState, useGlobalState } from "../../hookState";
import DropdownMenu from "../components/DropdownMenu/dropdownMenu";
import AnswerButtons from "../components/AnswerButtons/answerButtons";


const CardHaveInsurance = () => {
   const [isError] = useGlobalState("isError");

   const allCompany = [ 
      "I do not have an active insurance plan.",
      "My insurance is not listed.",
      "United Healthcare",
      "Oscar",
      "Aetna",
      "Molina Healthcare",
      "Humana",
      "Cigna",
      "Magellan",
      "Anthem",
      "Blue California",
      "Blue Shield",
      "Care Plus",
      "Freedom Health",
      "WellCare",
      "United American",
      "Caresource",
      ]




    return (
      <div className="card-have-insurance">
         <div className="">
           <div className="">
          
                 
                  <DropdownMenu
                   listİtem={allCompany}
                   right={gV.mq.matches ? "110px" : "0px"}  />
              
                   
           </div>
         </div>
      </div>
    );
}

export default CardHaveInsurance;