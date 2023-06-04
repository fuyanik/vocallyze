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

      
  const ChangeableText = () => { 
     if(gV.insuranceText === "ship") {
        return "Alright, we will send you an address to which you should mail your medical images right after the payment authorization. "    }
     if (gV.insuranceText === "upload") {
        return "Superb, we received all of your files"  }
     if (gV.insuranceText === "none") {
        return "You are all set. We will acquire a copy of your medical images on your behalf. "
     }
  
      }


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